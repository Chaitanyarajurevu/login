import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, validateEmail, validatePassword } from '../services/authService'
import './Login.css'

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate()
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      // Call login API
      const response = await login(formData.email, formData.password)
      
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
      setApiError(error.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container login-page">
      <div>
        <div className="auth-box">
          <h1 className="auth-logo">InstaClone</h1>
          
          <form className="auth-form" onSubmit={handleSubmit}>
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
            
            <button 
              type="submit" 
              className="form-button"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
            
            {apiError && <div className="error-message">{apiError}</div>}
          </form>
        </div>
        
        <div className="auth-switch">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
