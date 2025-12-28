import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    console.log('Registration attempt:', { username, email })

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' })
    }

    // Check if user exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] })
    if (userExists) {
      console.log('User already exists:', userExists.email === email ? 'email' : 'username')
      return res.status(400).json({ 
        message: userExists.email === email ? 'Email already registered' : 'Username already taken' 
      })
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password
    })

    console.log('User created successfully:', { id: user._id, username: user.username, email: user.email })

    if (user) {
      res.status(201).json({
        token: generateToken(user._id),
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar
        }
      })
    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Server error during registration' })
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    console.log('Login attempt:', { email })

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }

    // Check for user
    const user = await User.findOne({ email })
    if (!user) {
      console.log('User not found:', email)
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    console.log('User found:', { id: user._id, username: user.username })

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      console.log('Password mismatch for user:', email)
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    console.log('Login successful:', { username: user.username, email: user.email })

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error during login' })
  }
}

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}
