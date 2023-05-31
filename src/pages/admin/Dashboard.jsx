import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Admin-UI/Sidebar';
import LineChartsAdmin from '../../components/Admin-UI/LineChartsAdmin';

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <Sidebar />
      <LineChartsAdmin />
    </div>
  );
}

export default Dashboard;
