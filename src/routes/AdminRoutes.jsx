import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/admin/login';
import Dashboard from '../pages/admin/Dashboard';
import Theatre from '../pages/admin/Theatre';
import User from '../pages/admin/User';
import LineChartsAdmin from '../components/Admin-UI/LineChartsAdmin';

const adminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user" element={<User />} />
      <Route path="/theatre" element={<Theatre />} />
      <Route path="/line-chart-admin" element={<LineChartsAdmin />} />
    </Routes>
  );
};

export default adminRoutes;
