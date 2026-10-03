import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import Editor from "@monaco-editor/react";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-3.5-flash";

const options = [
  { value: "HTML + CSS", label: "HTML+CSS" },
  { value: "HTML + Tailwind CSS (use the Tailwind CDN script)", label: "HTML+Tailwind CSS" },
  { value: "HTML + Bootstrap 5 (use the Bootstrap CDN)", label: "HTML+Bootstrap" },
  { value: "HTML + CSS + JavaScript", label: "HTML+CSS+JS" },
  { value: "HTML + Tailwind CSS + Bootstrap + JavaScript (use CDNs)", label: "HTML+Tailwind+Bootstrap" },
];

// Model kabhi-kabhi ```html ... ``` laga deta hai, use hata do
const cleanCode = (text) =>
  text.replace(/^```[a-zA-Z]*\s*\n?/, "").replace(/\n?```\s*$/, "").trim();

const Home = () => {
  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [framework, setFramework] = useState(options[0]);
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    setError("");
    if (!API_KEY) {
      setError("API key nahi mili. .env.local me VITE_GEMINI_API_KEY daalo aur server restart karo.");
      return;
    }
    if (!prompt.trim()) {
      setError("Pehle component ka description likho.");
      return;
    }
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: `You are an expert UI developer. Create a responsive, modern, good-looking UI component using ${framework.value}.
Component: ${prompt}

Rules:
- Return ONE complete, self-contained HTML document (<!DOCTYPE html> with <head> and <body>).
- Include any needed CDN links/scripts inside it.
- Return ONLY the code. No explanations, no markdown fences.`,
      });
      setCode(cleanCode(response.text || ""));
      setOutputScreen(true);
      setTab(1);
    } catch (e) {
      console.error(e);
      setError(`Generate fail hua: ${e.message || e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-between px-[100px] gap-[30px]">
        {/* LEFT */}
        <div className="w-[50%] py-[30px] rounded-xl bg-[#141319] mt-[5px] p-[20px]">
          <h3 className="text-[25px] font-semibold text-white mt-[10px]">AI Component Generator</h3>
          <p className="text-gray-400 mt-[2px] text-[16px]">Please Describe your Component</p>
          <p className="text-[15px] font-[700] mt-[4px] text-white">Framework</p>

          <Select
            className="mt-[10px]"
            options={options}
            value={framework}
            onChange={setFramework}
            styles={{
              control: (base) => ({ ...base, backgroundColor: "#111", borderColor: "#333", color: "#fff", boxShadow: "none" }),
              menu: (base) => ({ ...base, backgroundColor: "#111" }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? "#333" : state.isFocused ? "#222" : "#111",
                color: "#fff",
              }),
              singleValue: (base) => ({ ...base, color: "#fff" }),
              placeholder: (base) => ({ ...base, color: "#aaa" }),
              input: (base) => ({ ...base, color: "#fff" }),
            }}
          />

          <p className="text-[15px] font-[700] mt-[15px] text-white">Describe your Components</p>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full min-h-[200px] rounded-xl bg-[#09090B] mt-[10px] p-[10px] text-white"
            placeholder="Describe your component in Detail..."
          ></textarea>

          {error && <p className="text-red-400 text-[14px] mt-[10px]">{error}</p>}

          <div className="flex items-center justify-between mt-[15px]">
            <p className="text-gray-400 text-[14px]">Click on Generate button to generate your code</p>

            <button
              onClick={generate}
              disabled={loading}
              className="flex items-center p-[12px] rounded-lg bg-gradient-to-r from-purple-400 via-purple-600 to-pink-500 px-[20px] gap-[10px] hover:opacity-[0.8] transition disabled:opacity-50"
            >
              {loading ? <ClipLoader size={16} color="#fff" /> : <BsStars />}
              {loading ? "Generating..." : "Generate"}
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
              <p className="text-[16px] text-gray-400 mt-3">Your component & code will appear here.</p>
            </div>
          ) : (
            <>
              <div className="bg-[#17171C] w-full h-[50px] flex items-center gap-3 px-3">
                {[["Code", 1], ["Preview", 2]].map(([label, n]) => (
                  <button
                    key={n}
                    onClick={() => setTab(n)}
                    className={`w-1/2 py-2 rounded-lg ${tab === n ? "bg-purple-600 text-white" : "bg-zinc-800 text-gray-300"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="w-full h-[calc(80vh-50px)]">
                {tab === 1 ? (
                  <Editor
                    height="100%"
                    language="html"
                    theme="vs-dark"
                    value={code}
                    onChange={(v) => setCode(v ?? "")}
                    options={{ minimap: { enabled: false }, fontSize: 14, wordWrap: "on" }}
                  />
                ) : (
                  <iframe title="preview" srcDoc={code} className="w-full h-full bg-white" />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;