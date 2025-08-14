import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/signup" className="nav-link">Sign Up</Link>
        <Link to="/signin" className="nav-link">Sign In</Link>
        <Link to="/events" className="nav-link">Events</Link>
      </nav>
    </header>
  )
}

export default Header
