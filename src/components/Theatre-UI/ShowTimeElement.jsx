import React, { useState } from 'react';
import { deleteShowTimeAPI } from '../../APIs/Theatre';
import { useSelector } from 'react-redux';
import { strToTime } from '../../utils/time';

const ShowTimeElement = ({ el }) => {
  const currentUserToken = useSelector((state) => state?.token?.data);
  const [deleted, setDeleted] = useState(false);

  const deleteShowTime = async (id) => {
    await deleteShowTimeAPI(id, currentUserToken);
    setDeleted(true);
  };

  return (
    !deleted && (
      <tr key={el._id} className="h-16 border border-gray-100 rounded">
        <td>
          <div className="flex items-center pl-5">
            <p className="text-base font-medium leading-none text-gray-700 mr-2"> {el.showName} </p>
          </div>
        </td>

        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-sm leading-none text-gray-600 ml-2"> {strToTime(el.startTime)} </p>
          </div>
        </td>
        <td>
          <div className="flex items-center">
            <p className="text-sm leading-none text-gray-600 ml-2"> {strToTime(el.endTime)} </p>
          </div>
        </td>

        <td className="pl-5">
          <button onClick={() => deleteShowTime(el._id)} className="py-3 px-3 text-sm focus:outline-none leading-none text-white-500 bg-red-600 hover:bg-red-200 rounded">
            Delete
          </button>
        </td>
      </tr>
    )
  );
};

export default ShowTimeElement;
