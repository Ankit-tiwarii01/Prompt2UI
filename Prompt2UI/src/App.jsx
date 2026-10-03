import React from 'react'
import "./App.css"
import Home from './pages/home'
import NoPage from './pages/nopage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <ToastContainer position="top-right" theme="dark" autoClose={2000} />
    </BrowserRouter>
  )
}

export default App