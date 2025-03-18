import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Answer from './pages/v1/Answer';
import Steps from './pages/v2/Steps';
import './App.css';
import Maintance from './pages/v3/Maintance';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/v1" element={<Answer />} />
        <Route path="/v2" element={<Steps />} />
        <Route path="/v3" element={<Maintance />} />
      </Routes>
    </Router>
  );
};

export default App;
