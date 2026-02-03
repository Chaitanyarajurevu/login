import User from '../models/User.js'
import OTP from '../models/OTP.js'
import { sendOTPEmail } from '../config/email.js'
import bcrypt from 'bcryptjs'

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// @desc    Request password reset (send OTP)
// @route   POST /api/password/forgot
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    console.log('Forgot password request for:', email)

    // Validation
    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'No account found with this email' })
    }

    // Generate OTP
    const otp = generateOTP()
    console.log('Generated OTP:', otp)

    // Delete any existing OTPs for this email
    await OTP.deleteMany({ email })

    // Save OTP to database
    await OTP.create({ email, otp })

    // Send OTP via email
    try {
      await sendOTPEmail(email, otp)
      console.log('OTP sent successfully to:', email)
      
      res.json({ 
        success: true,
        message: 'OTP sent to your email. Please check your inbox.' 
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      res.status(500).json({ 
        message: 'Failed to send OTP email. Please try again later.' 
      })
    }
  } catch (error) {
    console.error('Forgot password error:', error)
    res.status(500).json({ message: 'Server error. Please try again.' })
  }
}

// @desc    Verify OTP
// @route   POST /api/password/verify-otp
// @access  Public
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body

    console.log('OTP verification request:', { email, otp })

    // Validation
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' })
    }

    // Find OTP in database
    const otpRecord = await OTP.findOne({ email, otp })

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' })
    }

    console.log('OTP verified successfully for:', email)

    res.json({ 
      success: true,
      message: 'OTP verified successfully' 
    })
  } catch (error) {
    console.error('OTP verification error:', error)
    res.status(500).json({ message: 'Server error. Please try again.' })
  }
}

// @desc    Reset password
// @route   POST /api/password/reset
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body

    console.log('Password reset request for:', email)

    // Validation
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    // Verify OTP
    const otpRecord = await OTP.findOne({ email, otp })
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Update password (will be hashed by pre-save hook)
    user.password = newPassword
    await user.save()

    // Delete OTP after successful password reset
    await OTP.deleteMany({ email })

    console.log('Password reset successful for:', email)

    res.json({ 
      success: true,
      message: 'Password reset successfully. You can now login with your new password.' 
    })
  } catch (error) {
    console.error('Password reset error:', error)
    res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
