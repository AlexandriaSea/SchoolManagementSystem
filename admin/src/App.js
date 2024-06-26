/**
 * Student Name: Wenjie Zhou
 * Student Number: 301337168
 * Submission Date: Apr 12, 2024
 */

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Add from './pages/Add';
import Edit from './pages/Edit';
import Detail from './pages/Detail';

// Setting up Router to manage routing across different components
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
