import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './app.css';

const Sample = () => (
  <div>
    <p>Sample</p>
  </div>
);

const Sample2 = () => (
  <div>
    <p>Sample2</p>
  </div>
);

export default () => (
  <Routes>
    <Route path="/sample" element={<Sample2 />} />
    <Route path="/" element={<Sample />} />
  </Routes>
);
