import { getData } from '../services/dataService.js'
import axios from 'axios'
import { BASE_URL } from '../config/config.js'

export async function getTopUsers(req, res) {
  try {
    let data = await getData()
    let users = data.users
    let posts = data.posts
    let comments = data.comments
    
    
    let userComments = {}
    
    for (let i = 0; i < users.length; i++) {
      userComments[users[i].id] = 0
    }
    
    for (let i = 0; i < posts.length; i++) {
      let userId = posts[i].userid
      let postId = posts[i].id
      
      if (comments[postId]) {
        userComments[userId] += comments[postId].length
      }
    }
    
   
    let usersWithComments = []
    for (let i = 0; i < users.length; i++) {
      usersWithComments.push({
        ...users[i],
        commentCount: userComments[users[i].id] || 0
      })
    }
    
 
    usersWithComments.sort(function(a, b) {
      return b.commentCount - a.commentCount
    })
    
  
    let topUsers = usersWithComments.slice(0, 100)
    
   
    let formattedResponse = { users: {} }
    for (let i = 0; i < topUsers.length; i++) {
      formattedResponse.users[topUsers[i].id] = topUsers[i].name
    }
    
    res.json(formattedResponse)
  } catch (err) {
    console.log('error getting users', err)
    res.status(500).json({ error: 'server error' })
  }
}

export async function getUserPosts(req, res) {
    try {
      
      let userId = Number(req.params.userId)
      
      
      let myToken = null
      
      if (global.token && global.tokenTime && Date.now() < global.tokenTime) {
        myToken = global.token
      } else {
        let authData = {
          email: process.env.EMAIL,
          name: process.env.NAME,
          rollNo: process.env.ROLL_NO,
          accessCode: process.env.ACCESS_CODE,
          clientID: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET
        }
        
        let authRes = await axios.post(`${BASE_URL}/auth`, authData)
        myToken = authRes.data.access_token
        global.token = myToken
        global.tokenTime = authRes.data.expires_in * 1000
      }
      
      
      console.log(`Fetching posts for user ID: ${userId}`)
      let response = await axios.get(`${BASE_URL}/users/${userId}/posts`, {
        headers: {
          Authorization: `Bearer ${myToken}`
        }
      })
      
    
      if (response.data && response.data.posts) {
        res.json(response.data)
      } 
    } catch (err) {
      console.log('error getting user posts', err.message)
      res.status(500).json({ error: 'failed to get user posts' })
    }
  }