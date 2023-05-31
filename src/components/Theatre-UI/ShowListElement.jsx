import React, { useState } from 'react';
import { deleteShowAPI } from '../../APIs/Theatre';
import { useSelector } from 'react-redux';
import { strToTime } from '../../utils/date';

function ShowListElement({ el }) {
  const currentUserToken = useSelector((state) => state?.token?.data);
  const [deleted, setDeleted] = useState(false);
  const deleteShow = async (id) => {
    console.log(id);
    try {
      await deleteShowAPI(id, currentUserToken);
      setDeleted(true);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    !deleted && (
      <tr key={el._id} className="h-16 border border-gray-100 rounded">
        <td>
          <div className="flex items-center pl-5">
            <p className="text-base font-medium leading-none text-gray-700 mr-2"> {el.show} </p>
          </div>
        </td>

        <td className="pl-5">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
              <path d="M3.33331 17.4998V6.6665C3.33331 6.00346 3.59671 5.36758 4.06555 4.89874C4.53439 4.4299 5.17027 4.1665 5.83331 4.1665H14.1666C14.8297 4.1665 15.4656 4.4299 15.9344 4.89874C16.4033 5.36758 16.6666 6.00346 16.6666 6.6665V11.6665C16.6666 12.3295 16.4033 12.9654 15.9344 13.4343C15.4656 13.9031 14.8297 14.1665 14.1666 14.1665H6.66665L3.33331 17.4998Z" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 9.1665V9.17484" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.66669 9.1665V9.17484" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.3333 9.1665V9.17484" stroke="#52525B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm leading-none text-gray-600 ml-2"> {el.movie.original_title}</p>
          </div>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-sm leading-none text-gray-600 ml-2"> {strToTime(el.Date)}</p>
          </div>
        </td>

        <td className="pl-5">
          <button
            className="py-3 px-3 text-sm focus:outline-none leading-none text-green-500 bg-green-100 hover:bg-green-200 rounded"
            // onClick={(e) => blockUser(el._id)}
          >
            {el.screen}
          </button>
        </td>
        <td className="pl-5">
          <button onClick={() => deleteShow(el._id)} className="py-3 px-3 text-sm focus:outline-none leading-none text-red-500 bg-red-100 hover:bg-red-200 rounded">
            Delete
          </button>
        </td>
      </tr>
    )
  );
}

export default ShowListElement;
