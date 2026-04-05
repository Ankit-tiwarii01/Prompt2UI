import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="flex items-center justify-between px-[100px] gap-[30px]">
        
        <div className="w-[50%] h-[80vh] bg-[#141319] mt-5 p-[20px]">
          <h3 className="text-[25px] Font-semibold sp-text">
            AI Component Generator
          </h3>
          <p className="text-[gray] mt-2 text-[16px]">Please Describe your Component  </p>
        </div>

        <div className="w-[50%] h-[80vh] bg-[#141319] mt-5"></div>

      </div>
    </>
  )
}

export default Home