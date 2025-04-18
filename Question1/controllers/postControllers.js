import { getData } from '../services/dataService.js'
import axios from 'axios'
import { BASE_URL } from '../config/config.js'

export async function getPosts(req, res) {
  try {
    let type = req.query.type
    
    if (type != 'popular' && type != 'latest') {
      res.status(400).json({ error: 'bad request, type must be popular or latest' })
      return
    }
    
    let data = await getData()
    let posts = data.posts
    let comments = data.comments
    
    if (type == 'popular') {
  
      let postsWithComments = []
      
      for (let i = 0; i < posts.length; i++) {
        let post = posts[i]
        let commentCount = 0
        
        if (comments[post.id]) {
          commentCount = comments[post.id].length
        }
        
        postsWithComments.push({
          ...post,
          commentCount: commentCount
        })
      }
      

      let maxComments = 0
      for (let i = 0; i < postsWithComments.length; i++) {
        if (postsWithComments[i].commentCount > maxComments) {
          maxComments = postsWithComments[i].commentCount
        }
      }
      

      let popularPosts = []
      for (let i = 0; i < postsWithComments.length; i++) {
        if (postsWithComments[i].commentCount == maxComments) {
          popularPosts.push(postsWithComments[i])
        }
      }
      
      res.json(popularPosts)
    } else {

      let postsCopy = [...posts]
      
      postsCopy.sort(function(a, b) {
        return b.id - a.id
      })
      
      let latestPosts = postsCopy.slice(0, 5)
      res.json(latestPosts)
    }
  } catch (err) {
    console.log('error getting posts', err)
    res.status(500).json({ error: 'server error' })
  }
}
export async function getPostComments(req, res) {
    try {
 
      let postId = Number(req.params.postId)
      
      // Get token
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

      console.log(`Fetching comments for post ID: ${postId}`)
      let response = await axios.get(`${BASE_URL}/posts/${postId}/comments`, {
        headers: {
          Authorization: `Bearer ${myToken}`
        }
      })
      
   
      if (response.data && response.data.comments) {
        res.json(response.data)
      }
    } catch (err) {
      console.log('error getting post comments', err.message)
      res.status(500).json({ error: 'failed to get post comments' })
    }
  }