import './App.css'
import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './views/Home/Home'
import Results from './views/Results/Results'
// import FormCreate from './views/FormCreate/FormCreate'
import Footer from './components/Footer/Footer'
import DetailHotel from './views/Detail/Detail'
import Reserv from './views/Reserv/Reserv'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import Hotel from './views/Hotel/Hotel'
import UserDashboard from './components/UserDashboard/DashboardUser'

function App() {
  const { pathname } = useLocation();
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/results' element={<Results />} />
        <Route path="/detail/:hotelId" element={<DetailHotel />} />
        <Route path='/user' element={<UserDashboard/>}/>
        <Route path="/hotel" element={
          <ProtectedRoutes>
            <Hotel />
          </ProtectedRoutes>
        } />

        <Route path='/reserva' element={<Reserv />} />
      </Routes>

      {!/(\/hotel)$/.test(pathname) ? <Footer /> : null}
    </>
  )
}

export default App
