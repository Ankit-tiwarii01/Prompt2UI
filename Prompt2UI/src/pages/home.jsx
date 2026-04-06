import React from 'react'
import Navbar from '../components/Navbar'
import Select from 'react-select';

const Home = () => {

  const options = [
  { value: 'html-css', label: 'HTML+CSS' },
  { value: 'html-tailwind', label: 'HTML+Tailwind CSS' },
  { value: 'html-bootstarp', label: 'HTML+Bootstarp' },
  { value: 'html-css-js', label: 'HTML+CSS+js' },
  { value: 'html-tailwind-bootstarp', label: 'HTML+Tailwind+BOOTstarp' },
];
  return (
    <>
      <Navbar />

      <div className="flex items-center justify-between px-[100px] gap-[30px]">
        
        <div className="w-[50%] h-[80vh] bg-[#141319] mt-5 p-[20px]">
          <h3 className="text-[25px] Font-semibold sp-text">
            AI Component Generator
          </h3>
          <p className="text-[gray] mt-2 text-[16px]">Please Describe your Component  </p>
          <p className='text-[15px] font-[700] mt-4'>Framework</p>
          <Select
          //padding in line 
            className='mt-2'
            options={options}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#111",
                borderColor: "#333",
                color: "#fff",
                boxShadow: "none",
                "&:hover": { borderColor: "#555" }
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#111",
                color: "#fff"
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#333"
                  : state.isFocused
                    ? "#222"
                    : "#111",
                color: "#fff",
                "&:active": { backgroundColor: "#444" }
              }),
              singleValue: (base) => ({ ...base, color: "#fff" }),
              placeholder: (base) => ({ ...base, color: "#aaa" }),
              input: (base) => ({ ...base, color: "#fff" })
            }}
            
          />
          <p className='text-[15px] font-[700] mt-5'>Describe your Components</p>
          <textarea className='w-full min-h-[200px] rounded-xl bg-[#09090B] mt-3 p-[10px]' placeholder='Describe your component in Detail...'></textarea>
          <button className='generate flex items-center p-[15px] rounded-lg border-0 bg-gradient-to-r from-purple-400 via-purple-600 to-pink-500 mt-3 ml-auto min-w-[120px]'>Generate</button>
        </div>

        <div className="w-[50%] h-[80vh] bg-[#141319]"></div>

      </div>
    </>
  )
}

export default Home