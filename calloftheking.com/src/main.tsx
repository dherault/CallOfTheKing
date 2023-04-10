import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import LogRocket from 'logrocket'

import App from './App'
import './firebase'

LogRocket.init('vmxkqe/call-of-the-king')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
