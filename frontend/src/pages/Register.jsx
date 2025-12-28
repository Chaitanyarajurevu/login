import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register, validateEmail, validatePassword } from '../services/authService'
import './Register.css'

function Register({ setIsAuthenticated }) {
  const navigate = useNavigate()
  
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  // UI state
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    setApiError('')
  }

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {}

    if (!formData.username) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setApiError('')

    try {
      // Call register API
      const response = await register(
        formData.username,
        formData.email,
        formData.password
      )
      
      // Store token and user data
      if (response.token) {
        localStorage.setItem('token', response.token)
      }
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user))
      }
      
      // Update authentication state
      setIsAuthenticated(true)
      
      // Redirect to home page
      navigate('/home')
    } catch (error) {
      setApiError(error.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container register-page">
      <div>
        <div className="auth-box">
          <h1 className="auth-logo">InstaClone</h1>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="form-input"
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
            
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            
            <button 
              type="submit" 
              className="form-button"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
            
            {apiError && <div className="error-message">{apiError}</div>}
          </form>
        </div>
        
        <div className="auth-switch">
          Have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
