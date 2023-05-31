import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteSeatCharterAPI } from '../../APIs/Theatre';
import { useSelector } from 'react-redux';

const ScreenListElement = ({ el }) => {
  console.log(el);
  const currentUserToken = useSelector((state) => state?.token?.data);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  const deleteSeatCharter = async (id) => {
    console.log(id);
    await deleteSeatCharterAPI(id, currentUserToken);
    setDeleted(true);
  };
  return (
    !deleted && (
      <tr key={el._id} className="h-16 border border-gray-100 rounded">
        <td>
          <div className="flex items-center pl-5">
            <p className="text-base font-medium leading-none text-gray-700 mr-2">{el.screenName} </p>
          </div>
        </td>
        <td className="pl-4">
          <button onClick={() => navigate('/seatcharter-view', { state: { elementId: el._id } })} className="text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
            View
          </button>
        </td>
        <td className="pl-5">
          <button className="py-3 px-3 text-sm focus:outline-none leading-none text-red-500 bg-red-100 hover:bg-red-200 rounded" onClick={() => deleteSeatCharter(el._id)}>
            Delete
          </button>
        </td>
      </tr>
    )
  );
};

export default ScreenListElement;
