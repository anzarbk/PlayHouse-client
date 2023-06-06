import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Button, Empty } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TicketOfThisTheatre } from '../../../APIs/Theatre';
import TableRows from './TableRows';

export default function BookingTable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(5);
  // const [dataLength, setDataLength] = useState(0);
  // const lengther = () => {
  //   setDataLength(data.length);
  // };
  // const totalPages = Math.ceil(dataLength / itemsPerPage);
  // Slice the data array based on current page and items per page
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  //####################################

  const currentUserToken = useSelector((state) => state?.token?.data);
  useEffect(() => {
    async function invoke() {
      console.log(currentPage, currentUserToken);
      const tickets = await TicketOfThisTheatre(currentPage, currentUserToken);
      if (tickets.status) {
        console.log(tickets);
        setData(tickets.tickets);
      }
    }
    invoke();
    // lengther();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
              {data.map((ticket) => (
                <TableRows key={ticket._id} ticket={ticket} />
              ))}
            </TableBody>
          </Table>
          <div className="flex gap-2 w-full justify-center mt-2">
            <button className="text-xs w-fit px-2 border cursor-pointer bg-sky-700 rounded-md py-1" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
              Prev
            </button>
            <button
              className="text-xs w-fit px-2 border cursor-pointer bg-sky-700 rounded-md py-1"
              // disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
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
    </div>
  );
}
