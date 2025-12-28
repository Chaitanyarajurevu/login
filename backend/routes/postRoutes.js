import express from 'express'
import { 
  getPosts, 
  createPost, 
  likePost, 
  unlikePost, 
  addComment 
} from '../controllers/postController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/', protect, getPosts)
router.post('/', protect, createPost)
router.post('/:id/like', protect, likePost)
router.delete('/:id/like', protect, unlikePost)
router.post('/:id/comments', protect, addComment)

export default router
