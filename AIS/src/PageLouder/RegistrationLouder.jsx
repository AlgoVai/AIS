import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Registration from '../jsxf/Registration.jsx'

createRoot(document.getElementById('rg')).render(
  <StrictMode>
    <Registration/>
  </StrictMode>,
)
