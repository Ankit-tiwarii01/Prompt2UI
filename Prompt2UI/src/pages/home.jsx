import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";

const Home = () => {
  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);

  const options = [
    { value: "html-css", label: "HTML+CSS" },
    { value: "html-tailwind", label: "HTML+Tailwind CSS" },
    { value: "html-bootstarp", label: "HTML+Bootstarp" },
    { value: "html-css-js", label: "HTML+CSS+js" },
    { value: "html-tailwind-bootstarp", label: "HTML+Tailwind+BooTstarp" },
  ];

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-between px-[100px] gap-[30px]">

        {/* LEFT */}
        <div className="w-[50%] py-[30px] rounded-xl bg-[#141319] mt-[5px] p-[20px]">
          <h3 className="text-[25px] font-semibold text-white mt-[10px]">
            AI Component Generator
          </h3>

          <p className="text-gray-400 mt-[2px] text-[16px]">
            Please Describe your Component
          </p>

          <p className="text-[15px] font-[700] mt-[4px] text-white">
            Framework
          </p>

          <Select
            className="mt-[10px]"
            options={options}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#111",
                borderColor: "#333",
                color: "#fff",
                boxShadow: "none",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#111",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#333"
                  : state.isFocused
                  ? "#222"
                  : "#111",
                color: "#fff",
              }),
              singleValue: (base) => ({ ...base, color: "#fff" }),
              placeholder: (base) => ({ ...base, color: "#aaa" }),
              input: (base) => ({ ...base, color: "#fff" }),
            }}
          />

          <p className="text-[15px] font-[700] mt-[15px] text-white">
            Describe your Components
          </p>

          <textarea
            className="w-full min-h-[200px] rounded-xl bg-[#09090B] mt-[10px] p-[10px] text-white"
            placeholder="Describe your component in Detail..."
          ></textarea>

          <div className="flex items-center justify-between mt-[15px]">
            <p className="text-gray-400 text-[14px]">
              Click on Generate button to generate your code
            </p>

            <button
              onClick={() => setOutputScreen(true)}
              className="flex items-center p-[12px] rounded-lg bg-gradient-to-r from-purple-400 via-purple-600 to-pink-500 px-[20px] gap-[10px] hover:opacity-[0.8] transition"
            >
              <BsStars />
              Generate
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-[50%] h-[80vh] bg-[#141319] rounded-xl overflow-hidden">

          {!outputScreen ? (
            <div className="w-full h-full flex items-center justify-center flex-col">
              <div className="w-[70px] h-[70px] flex items-center justify-center text-[30px] rounded-full bg-gradient-to-r from-purple-400 to-purple-600">
                <HiOutlineCode className="text-white" />
              </div>

              <p className="text-[16px] text-gray-400 mt-3">
                Your component & code will appear here.
              </p>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="bg-[#17171C] w-full h-[50px] flex items-center gap-3 px-3">
                <button
                  onClick={() => setTab(1)}
                  className={`w-1/2 py-2 rounded-lg ${
                    tab === 1
                      ? "bg-purple-600 text-white"
                      : "bg-zinc-800 text-gray-300"
                  }`}
                >
                  Code
                </button>

                <button
                  onClick={() => setTab(2)}
                  className={`w-1/2 py-2 rounded-lg ${
                    tab === 2
                      ? "bg-purple-600 text-white"
                      : "bg-zinc-800 text-gray-300"
                  }`}
                >
                  Preview
                </button>
              </div>

              {/* Content */}
              <div className="p-5 text-white">
                {tab === 1 ? <p>Code will appear here...</p> : <p>Preview here...</p>}
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
};

export default Home;