import Navbar from "./components/Navbar"
import Pokedex from "./pages/Pokedex"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>
    </Router>
  )
}

export default App
