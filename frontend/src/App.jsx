import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup/>} />
    </Routes>

  );
}

export default App;
