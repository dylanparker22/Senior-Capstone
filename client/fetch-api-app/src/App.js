import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './Home.css';  // Import the new styles
import Home from './Home';
import Scores from './Scores';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sports Odds</h1>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scores/:sport" element={<Scores />} />
      </Routes>
    </div>
  );
}

export default App;


