import React, { useState } from 'react';
import { deleteTicketAPI } from '../../../APIs/Theatre';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useSelector } from 'react-redux';

const TableRows = ({ ticket }) => {
  const currentUserToken = useSelector((state) => state?.token?.data);

  const [del, setDel] = useState(false);
  const deleteTicket = async (ticketId, showId) => {
    console.log(ticketId, showId);
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const dataV = {
          ticketId,
          showId,
        };
        const cancel = await deleteTicketAPI(dataV, currentUserToken);
        if (cancel.status) {
          console.log(cancel);
          setDel(true);
        }

        Swal.fire('Saved!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };
  return !del ? (
    <TableRow key={ticket?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {ticket?.movieName}
      </TableCell>
      <TableCell align="center">{ticket?.movieShowTime}</TableCell>
      <TableCell align="center">{ticket?._id}</TableCell>
      <TableCell align="center">{ticket?.paymentMethod}</TableCell>
      <TableCell align="center">{ticket?.newAmount}</TableCell>
      <TableCell align="center">
        <div className="  text-center sm:px-6">
          <button
            type="submit"
            onClick={() => {
              deleteTicket(ticket?._id, ticket?.movieShowId);
            }}
            className="inline-flex justify-center rounded-md bg-red-700 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            cancel
          </button>
        </div>
      </TableCell>
    </TableRow>
  ) : (
    <></>
  );
};

export default TableRows;
