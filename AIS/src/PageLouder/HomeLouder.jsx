import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Registration from '../jsxf/Registration.jsx'
import Home from '../jsxf/home.jsx'

createRoot(document.getElementById('home')).render(
  <StrictMode>
    <pageLoader/>
  </StrictMode>,
)
