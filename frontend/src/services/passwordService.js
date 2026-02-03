import api from './api'

/**
 * Request password reset (send OTP)
 * @param {string} email - User email
 * @returns {Promise} API response
 */
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/password/forgot', { email })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to send OTP. Please try again.' }
  }
}

/**
 * Verify OTP
 * @param {string} email - User email
 * @param {string} otp - OTP code
 * @returns {Promise} API response
 */
export const verifyOTP = async (email, otp) => {
  try {
    const response = await api.post('/password/verify-otp', { email, otp })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Invalid OTP. Please try again.' }
  }
}

/**
 * Reset password
 * @param {string} email - User email
 * @param {string} otp - OTP code
 * @param {string} newPassword - New password
 * @returns {Promise} API response
 */
export const resetPassword = async (email, otp, newPassword) => {
  try {
    const response = await api.post('/password/reset', { email, otp, newPassword })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to reset password. Please try again.' }
  }
}
