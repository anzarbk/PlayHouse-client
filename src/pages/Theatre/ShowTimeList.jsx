import React, { useState, useEffect } from 'react';
import { deleteShowTimeAPI, getShowTimeAPI } from '../../APIs/Theatre';
import { useSelector } from 'react-redux';
// import theatre from '../../../Server/model/theatre';
import Layout from '../../components/User-UI/Layout';
import TheatreSidebar from '../../components/Theatre-UI/Dashboard/TheatreSidebar';
import { useNavigate } from 'react-router-dom';
import ShowTimeElement from '../../components/Theatre-UI/showTimeElement';

const ShowTimeList = () => {
  const currentUserToken = useSelector((state) => state?.token?.data);
  const [showtime, setShowTime] = useState([]);

  useEffect(() => {
    const getshowTime = async () => {
      const showTime = await getShowTimeAPI(currentUserToken);
      console.log(showTime);
      if (showTime.status) {
        const data = showTime.sTime;
        setShowTime(data);
      }
    };
    getshowTime();
  }, []);
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="flex">
        {' '}
        <TheatreSidebar />
        <div className=" w-[83vw] ml-10 py-8">
          <div className="bg-white py-8 md:py-7  ">
            <div className="sm:flex items-center justify-center">
              <button className="mt-4 sm:mt-0 inline-flex items-start justify-end px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                <p className="text-sm font-medium leading-none text-white">Show Time List</p>
              </button>
            </div>
            <div className="mt-7 overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <tbody>
                  {showtime.map((el) => (
                    <ShowTimeElement key={el._id} el={el} />
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center mt-6">
                <button onClick={() => navigate('/show-time')} className="text-sm leading-none text-white py-3 px-5 bg-green-900 rounded focus:outline-none">
                  Add Time
                </button>
              </div>
            </div>
          </div>
        </div>
        <style>
          {` .checkbox:checked + .check-icon {
                display: flex;
            }`}
        </style>
      </div>
    </Layout>
  );
};

export default ShowTimeList;
