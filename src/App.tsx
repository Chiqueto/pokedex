import Navbar from "./components/Navbar"
import GenerationDetails from "./pages/GenerationDetail"
import Generations from "./pages/Generations"
import Pokedex from "./pages/Pokedex"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="mb-10"><Navbar /></div>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/generations" element={<Generations />} />
        <Route path="/generations/:id" element={<GenerationDetails />} />
      </Routes>
    </Router>
  )
}

export default App
