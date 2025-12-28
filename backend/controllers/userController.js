import User from '../models/User.js'
import Story from '../models/Story.js'

// @desc    Get user profile
// @route   GET /api/users/:username
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('-password')
      .populate('posts')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error fetching user profile' })
  }
}

// @desc    Get suggested users
// @route   GET /api/users/suggestions
// @access  Private
export const getSuggestedUsers = async (req, res) => {
  try {
    // Get users that current user is not following
    const currentUser = await User.findById(req.user._id)
    
    const users = await User.find({
      _id: { 
        $ne: req.user._id,
        $nin: currentUser.following
      }
    })
    .select('username avatar')
    .limit(5)

    res.json({ users })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error fetching suggestions' })
  }
}

// @desc    Follow user
// @route   POST /api/users/:id/follow
// @access  Private
export const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id)

    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot follow yourself' })
    }

    const currentUser = await User.findById(req.user._id)

    // Check if already following
    if (currentUser.following.includes(req.params.id)) {
      return res.status(400).json({ message: 'Already following this user' })
    }

    // Add to following list
    currentUser.following.push(req.params.id)
    await currentUser.save()

    // Add to followers list
    userToFollow.followers.push(req.user._id)
    await userToFollow.save()

    res.json({ message: 'User followed successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error following user' })
  }
}

// @desc    Unfollow user
// @route   DELETE /api/users/:id/follow
// @access  Private
export const unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id)

    if (!userToUnfollow) {
      return res.status(404).json({ message: 'User not found' })
    }

    const currentUser = await User.findById(req.user._id)

    // Check if not following
    if (!currentUser.following.includes(req.params.id)) {
      return res.status(400).json({ message: 'Not following this user' })
    }

    // Remove from following list
    currentUser.following = currentUser.following.filter(
      id => id.toString() !== req.params.id
    )
    await currentUser.save()

    // Remove from followers list
    userToUnfollow.followers = userToUnfollow.followers.filter(
      id => id.toString() !== req.user._id.toString()
    )
    await userToUnfollow.save()

    res.json({ message: 'User unfollowed successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error unfollowing user' })
  }
}

// @desc    Get stories
// @route   GET /api/stories
// @access  Private
export const getStories = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id)
    
    // Get stories from users that current user follows
    const stories = await Story.find({
      user: { $in: [...currentUser.following, req.user._id] }
    })
    .populate('user', 'username avatar')
    .sort({ createdAt: -1 })

    // Format stories for frontend
    const formattedStories = stories.map(story => ({
      id: story._id,
      username: story.user.username,
      avatar: story.user.avatar,
      image: story.image,
      createdAt: story.createdAt
    }))

    res.json({ stories: formattedStories })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error fetching stories' })
  }
}
