import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// The three brand faces, self-hosted. Bebas Neue for impact, Oswald for
// structure, Poppins for reading. Latin subsets only, to keep the payload lean.
import '@fontsource/bebas-neue/latin-400.css'
import '@fontsource-variable/oswald/wght.css'
import '@fontsource/poppins/latin-300.css'
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-400-italic.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-600.css'

import './styles/tokens.css'
import './styles/base.css'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from './router/router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </StrictMode>,
)
