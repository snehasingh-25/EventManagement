import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div style={{height: '100vh', width: '100vw'}}>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
