import"./App.css"
import Home  from './pages/home';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App