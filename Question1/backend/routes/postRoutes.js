import express from 'express'
import { getPosts } from '../controllers/postControllers.js'
import { getPostComments } from '../controllers/postControllers.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/:postId/comments', getPostComments)


export default router