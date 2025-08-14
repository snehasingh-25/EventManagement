import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TodayIcon from '@mui/icons-material/Today';

const Header = () => {
  const navigate = useNavigate();

  const handleCreateEventClick = (e) => {
    const token = localStorage.getItem('token');
    if (!token) {
      e.preventDefault();
      alert('Please login to create event');
      navigate('/signin');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <header className="header">
      <nav className="nav">
        {/* <TodayIcon/> */}
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/signup" className="nav-link">Sign Up</Link>
        <Link to="/signin" className="nav-link">Sign In</Link>
        <Link
          to="/createevent"
          className="nav-link"
          onClick={handleCreateEventClick}
        >
          Create Event
        </Link>
        {isLoggedIn && (
          <button
            className="nav-link"
            style={{ background: 'var(--color-accent)', color: '#fff', border: 'none', cursor: 'pointer' }}
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  )
}

export default Header