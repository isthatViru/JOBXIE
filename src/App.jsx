import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Jobs from './components/Jobs';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Addjob from './components/Addjob';
import Addjobcard from './components/Addjobcard';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
            <Route path="/Register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/job" element={<Jobs />} />
         <Route path="/Createjob" element={<Addjob />} />
         <Route path="/Addjobcard" element={<Addjobcard />} />
           <Route path="/Edit/:id" element={<Addjob />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/resume" element={<Resume />} />
           <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



