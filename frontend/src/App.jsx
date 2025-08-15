import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';
import Layout from './components/Layout';
import './App.css';
import BackgroundWrapper from './components/BackgroundWrapper';
const App = () => {
  return (
    <BackgroundWrapper>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/events" element={<Events />} />
            <Route path="/createevent" element={<CreateEvent />} />
            <Route path="/createevent/:id" element={<CreateEvent />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    </BackgroundWrapper>
  )
}

export default App
