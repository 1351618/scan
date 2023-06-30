import React from 'react';
import './App.css';
import Home from './page_home/home';
import {Route, Routes } from 'react-router-dom';
import Authorization from './page_authorization/authorization';
import Search from './page_search/search';
import SearchResults from './page_search_results/search_results';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/search" element={<Search />} />
        <Route path="/SearchResults" element={<SearchResults />} />
      </Routes>
    </div>
  );
}

export default App;
