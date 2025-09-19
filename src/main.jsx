import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RoutesComponents from './Routes'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoutesComponents/>
  </StrictMode>,
)
