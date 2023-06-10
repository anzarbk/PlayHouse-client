import React, { useState, useEffect } from 'react';
import { deleteSeatCharterAPI, getSeatCharterDataAPI, getTheatreDataAPI } from '../../APIs/Theatre';
import { useSelector } from 'react-redux';
import Layout from '../../components/User-UI/Layout';
import TheatreSidebar from '../../components/Theatre-UI/Dashboard/TheatreSidebar';
import ScreenListElement from '../../components/Theatre-UI/ScreenListElement';

const ScreenList = () => {
  const currentUserToken = useSelector((state) => state?.token?.data);
  const currentUserId = useSelector((state) => state?.user?.data?._id); //##### This function for fetch data from redux
  const [screen, setScreen] = useState([]);

  useEffect(() => {
    async function getSeatCharters() {
      const theatre = await getTheatreDataAPI(currentUserId, currentUserToken);
      if (theatre.status) {
        const SeatCharter = await getSeatCharterDataAPI(theatre.theatre[0]._id, currentUserToken);
        if (SeatCharter.status) {
          setScreen(SeatCharter.seatcharter);
        }
      }
    }
    getSeatCharters();
  }, []);
  return (
    <Layout>
      <div className=" ">
        <div className="flex ">
          {' '}
          <TheatreSidebar />
          <div className="sm:px-6 w-[83vw]  py-8">
            <div className="bg-white py-8 md:py-7 px-4 md:px-8 xl:px-10">
              <div className="sm:flex items-center justify-center">
                <button className="mt-4 sm:mt-0 inline-flex items-start justify-end px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                  <p className="text-sm font-medium leading-none text-white">Screen List</p>
                </button>
              </div>
              <div className="mt-7 overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                  <tbody>
                    {screen.map((el) => (
                      <ScreenListElement key={el._id} el={el} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <style>
            {` .checkbox:checked + .check-icon {
                display: flex;
            }`}
          </style>
        </div>
      </div>
    </Layout>
  );
};

export default ScreenList;
