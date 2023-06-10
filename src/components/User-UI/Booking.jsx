import React, { useEffect, useState } from 'react';
import { getSeatCharterDataBYNameAPI } from '../../APIs/Theatre';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../Others/Loading';

const Booking = ({ theatre }) => {
  const currentUserToken = useSelector((state) => state?.token?.data);
  const navigate = useNavigate();

  const [seat1, setSeat1] = useState('');
  const [dates, setDates] = useState([]);
  const [shows, setShows] = useState([]);
  const todaysDate = new Date();
  const dateSetting = (date) => {
    const day1 = date.getUTCDate();
    const day2 = day1 + 1;
    const day3 = day2 + 1;
    let arr = [];
    arr.push(day1, day2, day3);
    setDates(arr);
  };

  const getTheatreAndShows = (el) => {
    let arr2 = [];
    for (let i = 0; i < theatre.length; i++) {
      const dateString = theatre[i].Date.toString();
      const date = new Date(dateString);
      const day = date.getUTCDate();
      if (el === day) {
        arr2.push(theatre[i]);
      }
    }
    setShows(arr2);
  };
  const showSeats = async (show) => {
    setSeat1(show.screen);
    if (seat1) {
      navigate('/seatcharter-user-view', { state: { show } });
    }
  };

  useEffect(() => {
    dateSetting(todaysDate);
    const day = todaysDate.getUTCDate();
    getTheatreAndShows(day);
  }, []);
  return (
    <div className="py-8 w-full">
      <div className="lg:flex flex-col items-center justify-center w-full">
        <div className="flex bg-gray-50 px-4 py-3 text-right sm:px-6 gap-6">
          {dates.map((el) => (
            <button
              key={el}
              onClick={() => {
                getTheatreAndShows(el);
              }}
              className="inline-flex justify-center rounded-md bg-blue-900 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {el}
            </button>
          ))}
        </div>
        {shows &&
          // console.log(shows) &&
          shows.map((show) => (
            <div key={show._id} className="lg:w-4/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded">
              <div className="flex items-center border-b border-gray-200 pb-6">
                <img src={show.theatre.image} alt className="w-12 h-12 rounded-full" />
                <div className="flex items-start justify-between w-full">
                  <div className="flex pl-3 w-full gap-2">
                    <p className="text-xl font-medium leading-5 text-gray-800">{show.theatre.name}</p>
                    <button onClick={() => showSeats(show)} className="py-2 px-4 text-xs leading-3 text-black rounded-full bg-green-100 cursor-pointer">
                      {show.screen.screenName}
                    </button>
                  </div>
                  <button onClick={() => showSeats(show)} className="py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100 cursor-pointer">
                    {show.show}
                  </button>
                </div>
              </div>
              <div className="px-2">
                <p className="text-sm leading-5 py-4 text-gray-600">{show.theatre.about}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Booking;
