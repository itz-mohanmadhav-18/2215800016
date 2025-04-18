import axios from 'axios'
import { BASE_URL, CACHE_DURATION } from '../config/config.js'
import dotenv from 'dotenv'

dotenv.config()


let users = []
let posts = []
let comments = {}
let lastUpdate = null
let token = null
let tokenTime = null
let isUpdating = false

async function getToken() {
  try {
    if (token && tokenTime && Date.now() < tokenTime) {
      return token
    }
    
    let authData = {
      email: process.env.EMAIL,
      name: process.env.NAME,
      rollNo: process.env.ROLL_NO,
      accessCode: process.env.ACCESS_CODE,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    }
    
    let res = await axios.post(`${BASE_URL}/auth`, authData)
    token = res.data.access_token
    tokenTime = res.data.expires_in * 1000
    
    return token
  } catch (err) {
    return null
  }
}

async function getUsers() {
  try {
    let myToken = await getToken()
    
    if (!myToken) {
      return []
    }

    let res = await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${myToken}`
      }
    })
    
    let usersData = []
    
    if (res.data && res.data.users && typeof res.data.users === 'object') {
      for (let id in res.data.users) {
        usersData.push({
          id: parseInt(id),
          name: res.data.users[id]
        })
      }
    }
    
    return usersData
  } catch (err) {
    return []
  }
}

async function getUserPosts(userID) {
  try {
    let myToken = await getToken()
    
    if (!myToken) {
      return []
    }

    let res = await axios.get(`${BASE_URL}/users/${userID}/posts`, {
      headers: {
        Authorization: `Bearer ${myToken}`
      },
      timeout: 5000  
    })
    
    let userPosts = []
    
    if (res.data && res.data.posts && Array.isArray(res.data.posts)) {
      userPosts = res.data.posts
    } else if (res.data && Array.isArray(res.data)) {
      userPosts = res.data
    }
    
    return userPosts
  } catch (err) {
    return []
  }
}

async function getPostComments(postID) {
  try {
    let myToken = await getToken()
    
    if (!myToken) {
      return []
    }

    let res = await axios.get(`${BASE_URL}/posts/${postID}/comments`, {
      headers: {
        Authorization: `Bearer ${myToken}`
      },
      timeout: 5000  
    })
    
    let postComments = []
    
    if (res.data && res.data.comments && Array.isArray(res.data.comments)) {
      postComments = res.data.comments
    } else if (res.data && Array.isArray(res.data)) {
      postComments = res.data
    }
    
    return postComments
  } catch (err) {
    return []
  }
}

async function updateAllData() {
  if (isUpdating) {
    return
  }
  
  isUpdating = true
  
  try {
    users = await getUsers()
    
   
    posts = []
   
    let userLimit = Math.min(users.length, 15)
    for (let i = 0; i < userLimit; i++) {
      let user = users[i]
      let userPosts = await getUserPosts(user.id)
      
      for (let j = 0; j < userPosts.length; j++) {
        posts.push(userPosts[j])
      }
      

      if (posts.length >= 30) {
        break
      }
    }
    
    comments = {}

    let postLimit = Math.min(posts.length, 20)
    for (let i = 0; i < postLimit; i++) {
      let post = posts[i]
      let postComments = await getPostComments(post.id)
      comments[post.id] = postComments
    }
  } catch (err) {
    // just ignore errors
  } finally {
    lastUpdate = Date.now()
    isUpdating = false
  }
}

export async function getData() {
  let now = Date.now()
  
  if (!lastUpdate || now - lastUpdate > CACHE_DURATION) {
    await updateAllData()
  }
  
  return {
    users: users,
    posts: posts,
    comments: comments
  }
}
