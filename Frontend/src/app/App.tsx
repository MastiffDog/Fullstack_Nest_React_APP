import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NotFound } from '../pages/notFound/NotFound';
import { MainDashBoard } from 'src/pages/mainDashBoard/mainDashBoard';

import './App.css';

const AppRoutes: React.FC = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainDashBoard />} />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;