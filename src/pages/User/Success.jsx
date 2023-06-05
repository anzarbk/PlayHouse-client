import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-slate-400 flex justify-center items-center">
      <div className="   card bg-white p-10 shadow-md rounded-md text-center">
        <div className="rounded-full bg-gray-100 h-40 w-40 mx-auto flex items-center justify-center">
          <i className="checkmark text-green-500 text-5xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="checkmark-icon w-16 h-16 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </i>
        </div>
        <h1 className="text-green-600 font-bold text-4xl mb-4">Success</h1>
        <p className="text-gray-700 text-lg">Your booking done successfully !</p>
        <button
          type="submit"
          onClick={() => {
            navigate('/ticket-list');
          }}
          className=" mt-6 inline-flex justify-center rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          tickets
        </button>
      </div>
    </div>
  );
};
export default Success;
