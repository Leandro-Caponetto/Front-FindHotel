import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home/Home'
import Results from './views/Results/Results'
import FormCreate from './views/FormCreate/FormCreate'
import Footer from './components/Footer/Footer'
import DetailHotel from './views/Detail/Detail'
import './App.css'
import SignUpClient from './views/SignUp/SignUp'

function App() {

  return (
    <>
    
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/results' element={<Results />} />
        <Route path='/form' element={<FormCreate />} />
        <Route path="/detail/:hotelId" element={<DetailHotel/>} />
        <Route path="/signUp" element={<SignUpClient/>} />

        

      </Routes>
      <Footer/>
    </>
  )
}

export default App
