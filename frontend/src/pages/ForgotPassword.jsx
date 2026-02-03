import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../services/authService'
import { forgotPassword, verifyOTP, resetPassword } from '../services/passwordService'
import './ForgotPassword.css'

function ForgotPassword() {
  const navigate = useNavigate()
  
  // Step state: 'email' -> 'otp' -> 'password'
  const [step, setStep] = useState('email')
  
  // Form data
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  // UI state
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation
    if (!email) {
      setError('Email is required')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      const response = await forgotPassword(email)
      setSuccess(response.message || 'OTP sent to your email')
      setTimeout(() => {
        setStep('otp')
        setSuccess('')
      }, 2000)
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle OTP verification
  const handleOTPSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!otp) {
      setError('OTP is required')
      return
    }

    if (otp.length !== 6) {
      setError('OTP must be 6 digits')
      return
    }

    setIsLoading(true)

    try {
      const response = await verifyOTP(email, otp)
      setSuccess(response.message || 'OTP verified successfully')
      setTimeout(() => {
        setStep('password')
        setSuccess('')
      }, 1500)
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle password reset
  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation
    if (!newPassword || !confirmPassword) {
      setError('All fields are required')
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      const response = await resetPassword(email, otp, newPassword)
      setSuccess(response.message || 'Password reset successfully')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Resend OTP
  const handleResendOTP = async () => {
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const response = await forgotPassword(email)
      setSuccess('OTP resent to your email')
    } catch (err) {
      setError(err.message || 'Failed to resend OTP')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container forgot-password-page">
      <div>
        <div className="auth-box">
          <h1 className="auth-logo">InstaClone</h1>
          
          {/* Step 1: Enter Email */}
          {step === 'email' && (
            <>
              <p className="forgot-password-subtitle">
                Enter your email address and we'll send you an OTP to reset your password.
              </p>
              
              <form className="auth-form" onSubmit={handleEmailSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
                
                <button 
                  type="submit" 
                  className="form-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </button>
                
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
              </form>
            </>
          )}

          {/* Step 2: Enter OTP */}
          {step === 'otp' && (
            <>
              <p className="forgot-password-subtitle">
                Enter the 6-digit OTP sent to <strong>{email}</strong>
              </p>
              
              <form className="auth-form" onSubmit={handleOTPSubmit}>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  className="form-input otp-input"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  disabled={isLoading}
                  maxLength="6"
                />
                
                <button 
                  type="submit" 
                  className="form-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
                
                <button 
                  type="button" 
                  className="resend-button"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                >
                  Resend OTP
                </button>
                
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
              </form>
            </>
          )}

          {/* Step 3: Reset Password */}
          {step === 'password' && (
            <>
              <p className="forgot-password-subtitle">
                Create a new password for your account
              </p>
              
              <form className="auth-form" onSubmit={handlePasswordSubmit}>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  className="form-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading}
                />
                
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  className="form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
                
                <button 
                  type="submit" 
                  className="form-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>
                
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
              </form>
            </>
          )}
        </div>
        
        <div className="auth-switch">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
