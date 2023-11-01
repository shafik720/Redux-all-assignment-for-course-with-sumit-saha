import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddBook from './Components/AddBook/AddBook';
import EditBook from './Components/EditBook/EditBook';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Main></Main>}></Route>
          <Route path='/addBook' element={<AddBook></AddBook>}></Route>
          <Route path='/editBook/:id' element={<EditBook></EditBook>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
