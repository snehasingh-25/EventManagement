import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './App.css'
import BackgroundWrapper from './components/BackgroundWrapper.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BackgroundWrapper>
    <App />
    </BackgroundWrapper>
  </StrictMode>,
)
