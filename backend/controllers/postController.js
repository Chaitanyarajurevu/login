import Post from '../models/Post.js'
import User from '../models/User.js'

// @desc    Get all posts (feed)
// @route   GET /api/posts
// @access  Private
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username avatar')
      .populate('comments.user', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(20)

    // Format posts for frontend
    const formattedPosts = posts.map(post => ({
      id: post._id,
      username: post.user.username,
      userAvatar: post.user.avatar,
      postImage: post.image,
      caption: post.caption,
      likes: post.likes.length,
      isLiked: post.likes.includes(req.user._id),
      comments: post.comments,
      createdAt: post.createdAt
    }))

    res.json({ posts: formattedPosts })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error fetching posts' })
  }
}

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { image, caption } = req.body

    if (!image) {
      return res.status(400).json({ message: 'Image is required' })
    }

    const post = await Post.create({
      user: req.user._id,
      image,
      caption
    })

    // Add post to user's posts array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { posts: post._id }
    })

    const populatedPost = await Post.findById(post._id).populate('user', 'username avatar')

    res.status(201).json({ post: populatedPost })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error creating post' })
  }
}

// @desc    Like a post
// @route   POST /api/posts/:id/like
// @access  Private
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    // Check if already liked
    if (post.likes.includes(req.user._id)) {
      return res.status(400).json({ message: 'Post already liked' })
    }

    post.likes.push(req.user._id)
    await post.save()

    res.json({ message: 'Post liked', likes: post.likes.length })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error liking post' })
  }
}

// @desc    Unlike a post
// @route   DELETE /api/posts/:id/like
// @access  Private
export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    // Check if not liked
    if (!post.likes.includes(req.user._id)) {
      return res.status(400).json({ message: 'Post not liked yet' })
    }

    post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString())
    await post.save()

    res.json({ message: 'Post unliked', likes: post.likes.length })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error unliking post' })
  }
}

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
export const addComment = async (req, res) => {
  try {
    const { text } = req.body

    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' })
    }

    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const comment = {
      user: req.user._id,
      text
    }

    post.comments.push(comment)
    await post.save()

    const populatedPost = await Post.findById(post._id)
      .populate('comments.user', 'username avatar')

    res.status(201).json({ 
      message: 'Comment added',
      comment: populatedPost.comments[populatedPost.comments.length - 1]
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error adding comment' })
  }
}
