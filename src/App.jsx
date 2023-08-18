import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home/Home'
import Results from './views/Results/Results'
import FormCreate from './views/FormCreate/FormCreate'
import Footer from './components/Footer/Footer'
import Detail from './components/Detail/Detail'


import './App.css'
import  Details  from './components/Detail/Detail'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/results' element={<Results />} />
        <Route path='/form' element={<FormCreate />} />
        <Route path="/detail/:hotelId" element={<Detail/>} />
        

      </Routes>
      <Footer/>
    </>
  )
}

export default App
