import './App.css';
import React from 'react';
import Pages from './Pages/Home';
import Category from './Components/Category';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Cuisine from './Pages/Cuisine';
import Home from './Pages/Home';

function App() { 
  return (
    <div className="App"> 
      <BrowserRouter>
      <Category />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cuisine/:type" element={<Cuisine />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
