import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import AppRoutes from './routes/AppRoutes.jsx'
import router from './routes/AppRoutes.jsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <AppRoutes />
  // </StrictMode>,
    <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
