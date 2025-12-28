import express from 'express'
import { 
  getUserProfile, 
  getSuggestedUsers, 
  followUser, 
  unfollowUser,
  getStories 
} from '../controllers/userController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/suggestions', protect, getSuggestedUsers)
router.get('/stories', protect, getStories)
router.get('/:username', protect, getUserProfile)
router.post('/:id/follow', protect, followUser)
router.delete('/:id/follow', protect, unfollowUser)

export default router
