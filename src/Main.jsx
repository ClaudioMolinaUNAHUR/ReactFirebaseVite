import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {BrowserRouter} from 'react-router-dom'
import UserProvider from './context/UserProvider'

import 'flowbite';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    {/* <React.StrictMode> Renderiza de forma intencional 2 veces los componentes*/} 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </React.StrictMode> */}
  </UserProvider>,
)
