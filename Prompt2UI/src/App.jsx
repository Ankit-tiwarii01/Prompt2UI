import React from 'react'
import"./App.css"
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
    <BrowserRouter>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<nopage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App