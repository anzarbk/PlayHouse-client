import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
import { Button, Empty } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { TicketForAdmin, deleteTicketAPI } from '../../APIs/Theatre';

export default function BookingTableAdmin() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [dataLength, setDataLength] = useState(0);
  const lengther = () => {
    setDataLength(data.length);
  };
  const totalPages = Math.ceil(dataLength / itemsPerPage);
  // Slice the data array based on current page and items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  //####################################

  const [open, setOpen] = useState(false);
  const [sucess, setSucess] = useState(null);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const currentUserToken = useSelector((state) => state?.token?.data);
  useEffect(() => {
    async function invoke() {
      const tickets = await TicketForAdmin(currentUserToken);
      if (tickets.status) {
        console.log(tickets);
        setData(tickets.tickets);
      }
    }
    invoke();
    lengther();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const deleteTicket = async (ticketId, showId) => {
    const dataV = {
      ticketId,
      showId,
    };
    const cancel = await deleteTicketAPI(dataV, currentUserToken);
    if (cancel.status) {
      setOpen(true);
      console.log(cancel);
      setSucess('ticket cancelled successfully');
    }
  };
  return (
    <div className="p-4">
      {data ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 550 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>MOVIE NAME</TableCell>
                <TableCell align="center">SHOWTIME</TableCell>
                <TableCell align="center">TICKET ID</TableCell>
                <TableCell align="center">PAYMENT METHOD</TableCell>
                <TableCell align="center">AMOUNT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((ticket) => (
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
              ))}
            </TableBody>
          </Table>
          <div className="flex gap-2 w-full justify-center mt-2">
            <button className="text-xs w-fit px-2 border cursor-pointer bg-sky-700 rounded-md py-1" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
              Prev
            </button>
            <button className="text-xs w-fit px-2 border cursor-pointer bg-sky-700 rounded-md py-1" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          </div>
        </TableContainer>
      ) : (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 60 }}
          description={
            <span>
              <a href="#API">NO DATA</a>
            </span>
          }
        >
          <Button type="primary" onClick={navigate('/movies')}>
            reload
          </Button>
        </Empty>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="cancel" sx={{ width: '100%' }}>
          {sucess}
        </Alert>
      </Snackbar>
    </div>
  );
}
