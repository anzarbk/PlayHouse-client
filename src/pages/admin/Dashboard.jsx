import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Admin-UI/Sidebar';
import PieCharts from '../../components/Admin-UI/PieCharts';
import BookingTableAdmin from '../../components/Admin-UI/BookingTableAdmin';

function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex ">
        <div className="fixed top-0 left-0">
          {' '}
          <Sidebar />
        </div>
        <div className="sm:px-6 w-[83vw] ml-[13rem]">
          <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
            <div className="sm:flex items-center justify-center">
              <button className="mt-4 sm:mt-0 inline-flex items-start justify-end px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                <p className="text-sm font-medium leading-none text-white">Chart</p>
              </button>
            </div>
            <div className="flex w-full pt-12 h-[400px] pl-2 gap-2">
              <PieCharts />
            </div>

            <div className="flex flex-col mt-8 items-center justify-center">
              <button className="mt-4 sm:mt-0 inline-flex items-start justify-end px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                <p className="text-sm font-medium leading-none text-white">Ticket table</p>
              </button>
              <div className="flex justify-center w-full pt-12 h-[550px] pl-2 gap-2">
                <BookingTableAdmin />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

// <div className="flex w-screen">
//   <Sidebar />
//   <LineChartAdmin />
// </div>
