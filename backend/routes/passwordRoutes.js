import express from 'express'
import { forgotPassword, verifyOTP, resetPassword } from '../controllers/passwordController.js'

const router = express.Router()

router.post('/forgot', forgotPassword)
router.post('/verify-otp', verifyOTP)
router.post('/reset', resetPassword)

export default router
