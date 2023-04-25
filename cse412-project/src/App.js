import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";

import Login from './pages/Login.js';
import CreateProfile from './pages/CreateProfile.js';
import Profile from './pages/Profile.js';
import HomePage from './pages/Homepage.js';
import Details from './pages/Details.js'
import NavBar from './pages/NavBar.js';
import Friends from './pages/Friends.js';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/CreateProfile' element={<CreateProfile />}></Route>
          <Route path='/Profile' element={<Profile/>}></Route>
          <Route path='/Homepage' element={<HomePage/>}></Route>
          <Route path='/details' element={<Details/>}></Route>
          <Route path='/Friends' element={<Friends/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
