import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
//import { useAuth } from './context/AuthContext.js'
import {AuthProvider} from './context/AuthContext.jsx'
import { CourseProvider } from './context/CourseContext.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'  // <-- bootstrap css
// optional: import bootstrap JS bundle if you need JS components (dropdowns, modals)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CourseProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </CourseProvider>
  </StrictMode>,
)
