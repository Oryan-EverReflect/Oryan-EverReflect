import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './dashboard';
import Calculator from './Calculator';
import Swap from './Swap';

const RoutesController = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/calculator" element={<Calculator />} />
    <Route path="/swap" element={<Swap />} />
  </Routes>
);

export default RoutesController;
