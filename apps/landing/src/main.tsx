import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Success } from './pages/Success'
import './styles/globals.css'

// Simple router based on path
const path = window.location.pathname

const Root = () => {
  if (path === '/success') {
    return <Success />
  }
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
