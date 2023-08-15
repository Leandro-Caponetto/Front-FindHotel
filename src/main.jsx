import React from 'react'
import ReactDOM from 'react-dom/client'
// import { Provider } from 'react-redux'
// import { store } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <App />
    </BrowserRouter>


)


    {/* <Provider store={store}> */}
