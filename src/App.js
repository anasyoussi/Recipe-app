import './App.css';
import React from 'react';
// eslint-disable-next-line
import Pages from './Pages/Home';
import Category from './Components/Category';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cuisine from './Pages/Cuisine';
import Home from './Pages/Home';
import Search from './Pages/Search';
import Searched from './Pages/Searched';

function App() { 
  return (
    <div className="App"> 
      <BrowserRouter>
      <Search />
      <Category />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cuisine/:type" element={<Cuisine />} />
              <Route path="/searched/:search" element={<Searched />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
