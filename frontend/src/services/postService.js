import api from './api'

/**
 * Get all posts for the feed
 * @returns {Promise} API response with posts array
 */
export const getPosts = async () => {
  try {
    const response = await api.get('/posts')
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch posts.' }
  }
}

/**
 * Create a new post
 * @param {Object} postData - Post data (image, caption)
 * @returns {Promise} API response
 */
export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create post.' }
  }
}

/**
 * Like a post
 * @param {string} postId - Post ID
 * @returns {Promise} API response
 */
export const likePost = async (postId) => {
  try {
    const response = await api.post(`/posts/${postId}/like`)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to like post.' }
  }
}

/**
 * Unlike a post
 * @param {string} postId - Post ID
 * @returns {Promise} API response
 */
export const unlikePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}/like`)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to unlike post.' }
  }
}

/**
 * Add comment to a post
 * @param {string} postId - Post ID
 * @param {string} text - Comment text
 * @returns {Promise} API response
 */
export const addComment = async (postId, text) => {
  try {
    const response = await api.post(`/posts/${postId}/comments`, { text })
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to add comment.' }
  }
}
