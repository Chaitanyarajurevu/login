import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { getPosts, likePost, unlikePost } from '../services/postService'
import { getSuggestedUsers, getStories, followUser } from '../services/userService'
import './Home.css'

function Home({ setIsAuthenticated }) {
  // Dummy data for stories
  const dummyStories = [
    { id: 1, username: 'john_doe', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, username: 'jane_smith', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, username: 'mike_wilson', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, username: 'sarah_jones', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, username: 'alex_brown', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, username: 'emma_davis', avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: 7, username: 'chris_miller', avatar: 'https://i.pravatar.cc/150?img=7' },
    { id: 8, username: 'lisa_taylor', avatar: 'https://i.pravatar.cc/150?img=8' },
  ]

  // Dummy data for posts
  const dummyPosts = [
    {
      id: 1,
      username: 'travel_lover',
      userAvatar: 'https://i.pravatar.cc/150?img=10',
      postImage: 'https://picsum.photos/600/600?random=1',
      likes: 1234,
      caption: 'Amazing sunset at the beach 🌅 #travel #nature',
      isLiked: false,
    },
    {
      id: 2,
      username: 'foodie_life',
      userAvatar: 'https://i.pravatar.cc/150?img=11',
      postImage: 'https://picsum.photos/600/600?random=2',
      likes: 856,
      caption: 'Delicious homemade pasta 🍝 #food #cooking',
      isLiked: false,
    },
    {
      id: 3,
      username: 'fitness_guru',
      userAvatar: 'https://i.pravatar.cc/150?img=12',
      postImage: 'https://picsum.photos/600/600?random=3',
      likes: 2341,
      caption: 'Morning workout complete! 💪 #fitness #motivation',
      isLiked: false,
    },
    {
      id: 4,
      username: 'pet_world',
      userAvatar: 'https://i.pravatar.cc/150?img=13',
      postImage: 'https://picsum.photos/600/600?random=4',
      likes: 3456,
      caption: 'My cute puppy 🐶❤️ #pets #dogs',
      isLiked: false,
    },
  ]

  // Dummy data for suggested users
  const dummySuggestions = [
    { id: 1, username: 'photographer_pro', avatar: 'https://i.pravatar.cc/150?img=20' },
    { id: 2, username: 'artist_daily', avatar: 'https://i.pravatar.cc/150?img=21' },
    { id: 3, username: 'music_beats', avatar: 'https://i.pravatar.cc/150?img=22' },
    { id: 4, username: 'tech_news', avatar: 'https://i.pravatar.cc/150?img=23' },
    { id: 5, username: 'fashion_style', avatar: 'https://i.pravatar.cc/150?img=24' },
  ]

  const [stories, setStories] = useState(dummyStories)
  const [posts, setPosts] = useState(dummyPosts)
  const [suggestions, setSuggestions] = useState(dummySuggestions)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Get logged-in user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
  const loggedInUser = {
    username: currentUser.username || currentUser.email?.split('@')[0] || 'user',
    avatar: currentUser.avatar || 'https://i.pravatar.cc/150?img=9',
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    try {
      setLoading(true)
      setError('')

      // Try to fetch real data, but keep dummy data if it fails
      const [postsData, storiesData, suggestionsData] = await Promise.all([
        getPosts().catch(() => null),
        getStories().catch(() => null),
        getSuggestedUsers().catch(() => null)
      ])

      // Use real data if available, otherwise keep dummy data
      if (postsData?.posts && postsData.posts.length > 0) {
        setPosts(postsData.posts)
      }
      if (storiesData?.stories && storiesData.stories.length > 0) {
        setStories(storiesData.stories)
      }
      if (suggestionsData?.users && suggestionsData.users.length > 0) {
        setSuggestions(suggestionsData.users)
      }
    } catch (err) {
      console.log('Using dummy data for UI preview')
    } finally {
      setLoading(false)
    }
  }

  // Handle like/unlike post
  const handleLikePost = async (postId, isLiked) => {
    // Only handle likes for real posts from database (MongoDB ObjectIds)
    if (!postId || typeof postId === 'number' || postId.toString().length !== 24) {
      console.log('Skipping like for dummy post')
      // Update UI optimistically for dummy posts
      setPosts(posts.map(post => {
        if (post.id === postId || post._id === postId) {
          return {
            ...post,
            isLiked: !isLiked,
            likes: isLiked ? post.likes - 1 : post.likes + 1
          }
        }
        return post
      }))
      return
    }

    try {
      if (isLiked) {
        await unlikePost(postId)
      } else {
        await likePost(postId)
      }

      // Update post in state
      setPosts(posts.map(post => {
        if (post.id === postId || post._id === postId) {
          return {
            ...post,
            isLiked: !isLiked,
            likes: isLiked ? post.likes - 1 : post.likes + 1
          }
        }
        return post
      }))
    } catch (err) {
      console.error('Error liking post:', err)
    }
  }

  // Handle follow user
  const handleFollowUser = async (userId) => {
    // Only handle follows for real users from database (MongoDB ObjectIds)
    if (!userId || typeof userId === 'number' || userId.toString().length !== 24) {
      console.log('Skipping follow for dummy user')
      // Remove user from suggestions optimistically for dummy users
      setSuggestions(suggestions.filter(user => 
        user.id !== userId && user._id !== userId
      ))
      return
    }

    try {
      await followUser(userId)

      // Remove user from suggestions
      setSuggestions(suggestions.filter(user => 
        user.id !== userId && user._id !== userId
      ))
    } catch (err) {
      console.error('Error following user:', err)
    }
  }

  if (loading) {
    return (
      <div className="home-page">
        <Navbar setIsAuthenticated={setIsAuthenticated} />
        <div className="home-content">
          <div className="feed-section">
            <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="home-page">
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      
      {error && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px', 
          color: '#ed4956',
          background: '#fff',
          margin: '20px auto',
          maxWidth: '600px',
          borderRadius: '8px'
        }}>
          {error}
        </div>
      )}
      
      <div className="home-content">
        {/* Feed Section */}
        <div className="feed-section">
          {/* Stories Section */}
          {stories.length > 0 && (
            <div className="stories-container">
              <div className="stories-scroll">
                {stories.map((story) => (
                  <div key={story.id || story._id} className="story-item">
                    <div className="story-avatar-wrapper">
                      <img 
                        src={story.avatar || story.userAvatar || 'https://i.pravatar.cc/150'} 
                        alt={story.username} 
                        className="story-avatar" 
                      />
                    </div>
                    <span className="story-username">{story.username}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Posts Feed */}
          <div className="posts-container">
            {posts.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '50px',
                background: 'white',
                borderRadius: '8px',
                border: '1px solid #dbdbdb'
              }}>
                No posts to show
              </div>
            ) : (
              posts.map((post) => {
                const postId = post.id || post._id
                return (
                  <div key={postId} className="post-card">
                    {/* Post Header */}
                    <div className="post-header">
                      <img 
                        src={post.userAvatar || post.user?.avatar || 'https://i.pravatar.cc/150'} 
                        alt={post.username || post.user?.username} 
                        className="post-user-avatar" 
                      />
                      <span className="post-username">
                        {post.username || post.user?.username}
                      </span>
                    </div>

                    {/* Post Image */}
                    <div className="post-image-container">
                      <img 
                        src={post.postImage || post.image || post.imageUrl} 
                        alt="Post" 
                        className="post-image" 
                      />
                    </div>

                    {/* Post Actions */}
                    <div className="post-actions">
                      <div className="action-icons">
                        <svg 
                          className="action-icon" 
                          fill={post.isLiked ? "currentColor" : "none"} 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          onClick={() => handleLikePost(postId, post.isLiked)}
                          style={{ cursor: 'pointer', color: post.isLiked ? '#ed4956' : 'inherit' }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </div>
                      <svg className="action-icon bookmark-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </div>

                    {/* Post Info */}
                    <div className="post-info">
                      <div className="post-likes">
                        {(post.likes || 0).toLocaleString()} likes
                      </div>
                      <div className="post-caption">
                        <span className="caption-username">
                          {post.username || post.user?.username}
                        </span> 
                        {post.caption}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="sidebar-section">
          {/* Current User Profile */}
          <div className="sidebar-user-profile">
            <img src={loggedInUser.avatar} alt={loggedInUser.username} className="sidebar-user-avatar" />
            <div className="sidebar-user-info">
              <span className="sidebar-username">{loggedInUser.username}</span>
              <span className="sidebar-user-fullname">Welcome back!</span>
            </div>
          </div>

          {/* Suggestions Section */}
          {suggestions.length > 0 && (
            <div className="suggestions-section">
              <div className="suggestions-header">
                <span className="suggestions-title">Suggestions For You</span>
                <span className="suggestions-see-all">See All</span>
              </div>

              <div className="suggestions-list">
                {suggestions.map((user) => {
                  const userId = user.id || user._id
                  return (
                    <div key={userId} className="suggestion-item">
                      <img 
                        src={user.avatar || user.profilePicture || 'https://i.pravatar.cc/150'} 
                        alt={user.username} 
                        className="suggestion-avatar" 
                      />
                      <div className="suggestion-info">
                        <span className="suggestion-username">{user.username}</span>
                        <span className="suggestion-subtitle">Suggested for you</span>
                      </div>
                      <button 
                        className="follow-button"
                        onClick={() => handleFollowUser(userId)}
                      >
                        Follow
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="sidebar-footer">
            <span>© 2024 InstaClone</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
