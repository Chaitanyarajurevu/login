import { useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear authentication token from localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Update authentication state
    setIsAuthenticated(false)
    
    // Redirect to login page
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <a href="/home" className="navbar-logo">
          InstaClone
        </a>
        <div className="navbar-actions">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
