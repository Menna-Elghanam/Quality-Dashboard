import "./App.css";

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/dashboard";
import Records from "./pages/records";
import Chart from "./pages/Chart";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/records" element={<Records />} />
      <Route path="/chart" element={<Chart />} />



    </Routes>
  );
};

export default App;



