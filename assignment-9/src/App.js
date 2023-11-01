import React from 'react';
import './App.css';
import Header from './Pages/Header/Header';
import Body from './Pages/Body/Body';
import AddTask from './Pages/AddTask/AddTask';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditTask from './Pages/EditTask/EditTask';

function App() {
  return (
    <div class="text-[#111827]">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Body></Body>} ></Route>
          <Route path="/addTask" element={<AddTask></AddTask>} ></Route>
          <Route path="/editTask/:id" element={<EditTask></EditTask>} ></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
