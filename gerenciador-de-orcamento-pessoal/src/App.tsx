import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/home.tsx';
import Sobre from './pages/sobre/sobre.tsx';
import Login from './pages/login/login.tsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
