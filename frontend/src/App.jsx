import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';
import Layout from './components/Layout';
import './App.css';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/createevent" element={<CreateEvent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
