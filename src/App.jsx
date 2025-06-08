// css import
import './index.css';

// react functionalities import 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// pages import
import MainPage from './pages/MainPage.jsx';
import DifficultySelection from './pages/DifficultySelection.jsx';
import GamePage from './pages/GamePage.jsx';
import Canvas from './pages/Canvas.jsx';

// components import

function App() {

  if(localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
  }
  else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme','light');
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/difficulty" element={<DifficultySelection />} />
          <Route path="/game/:difficulty" element={<GamePage />} />
          <Route path="/canvas/:difficulty" element={<Canvas />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
