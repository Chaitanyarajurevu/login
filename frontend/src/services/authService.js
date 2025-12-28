import api from './api'

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} API response
 */
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Login failed. Please try again.' }
  }
}

/**
 * Register new user
 * @param {string} username - Username
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} API response
 */
export const register = async (username, email, password) => {
  try {
    const response = await api.post('/auth/register', {
      username,
      email,
      password
    })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed. Please try again.' }
  }
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password length
 * @param {string} password - Password to validate
 * @returns {boolean} True if password is at least 6 characters
 */
export const validatePassword = (password) => {
  return password.length >= 6
}
