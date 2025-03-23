import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './context/auth.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <ChakraProvider resetCSS={false}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </AuthProvider>
)
