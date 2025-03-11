import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Answer from './pages/Answer'
import Steps from './pages/Steps'
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Steps />} />
        <Route path="/answer" element={<Answer />} />
      </Routes>
    </Router>
  )
}

export default App
