import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home/Home'
import Results from './views/Results/Results'
import FormCreate from './views/FormCreate/FormCreate'
import Footer from './components/Footer/Footer'

import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/results' element={<Results />} />
        <Route path='/form' element={<FormCreate />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
