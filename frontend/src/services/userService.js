import api from './api'

/**
 * Get user profile
 * @param {string} username - Username
 * @returns {Promise} API response with user data
 */
export const getUserProfile = async (username) => {
  try {
    const response = await api.get(`/users/${username}`)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch user profile.' }
  }
}

/**
 * Get suggested users to follow
 * @returns {Promise} API response with suggested users array
 */
export const getSuggestedUsers = async () => {
  try {
    const response = await api.get('/users/suggestions')
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch suggestions.' }
  }
}

/**
 * Follow a user
 * @param {string} userId - User ID to follow
 * @returns {Promise} API response
 */
export const followUser = async (userId) => {
  try {
    const response = await api.post(`/users/${userId}/follow`)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to follow user.' }
  }
}

/**
 * Unfollow a user
 * @param {string} userId - User ID to unfollow
 * @returns {Promise} API response
 */
export const unfollowUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}/follow`)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to unfollow user.' }
  }
}

/**
 * Get user stories
 * @returns {Promise} API response with stories array
 */
export const getStories = async () => {
  try {
    const response = await api.get('/stories')
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch stories.' }
  }
}
