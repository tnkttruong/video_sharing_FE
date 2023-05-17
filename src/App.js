import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Counter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
