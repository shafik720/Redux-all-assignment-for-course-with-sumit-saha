import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';
import Body from './Components/Body/Body';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Sidebar></Sidebar>
        <Body></Body>
      </BrowserRouter>

    </div>
  );
}

export default App;
