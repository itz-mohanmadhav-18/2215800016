import express from 'express'
import { getTopUsers } from '../controllers/userController.js'
import { getUserPosts } from '../controllers/userController.js'

const router = express.Router()

router.get('/', getTopUsers)
router.get('/:userId/posts', getUserPosts)

export default router