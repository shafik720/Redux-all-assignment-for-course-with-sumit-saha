import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SingleBlog from './Components/SingleBlog/SingleBlog';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        
        <Routes>
          <Route path="/" element={<Main></Main>} ></Route>
          <Route path="/main" element={<Main></Main>} ></Route>
          <Route path="/main/:blogId" element={<SingleBlog></SingleBlog>} ></Route>
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
