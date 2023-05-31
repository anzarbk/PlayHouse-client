import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from '../../components/User-UI/Navbar';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTicketListByUserId } from '../../APIs/Theatre';
import { Button, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData('Frozen yoghurt', 159, 6.0, 24, 4.0), createData('Ice cream sandwich', 237, 9.0, 37, 4.3), createData('Eclair', 262, 16.0, 24, 6.0), createData('Cupcake', 305, 3.7, 67, 4.3), createData('Gingerbread', 356, 16.0, 49, 3.9)];
const TicketList = () => {
  const currentUserToken = useSelector((state) => state?.token?.data);
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const invoke = async () => {
    const ticketList = await getTicketListByUserId(currentUserToken);
    console.log(ticketList);
    if (ticketList.status) {
      setTickets(ticketList.tickets);
    }
  };
  useEffect(() => {
    invoke();
  }, []);
  const getTicket = (id) => {};
  return (
    <div>
      <Navbar />
      <div className="p-14">
        <div className=" px-6 py-3 text-center sm:px-6">
          <button type="submit" className="inline-flex justify-center rounded-md bg-black py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            YOUR TICKET LIST
          </button>
        </div>
        {tickets ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, borderBlockColor: 'Highlight' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>MOVIE NAME</TableCell>
                  <TableCell align="center">SHOWTIME</TableCell>
                  <TableCell align="center">THEATRE</TableCell>
                  <TableCell align="center">PAYMENT METHOD</TableCell>
                  <TableCell align="center">AMOUNT</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((ticket, index) => (
                  <TableRow key={ticket?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {ticket.movieName}
                      {index == 0 ? <span className="text-sm text-red-600 text-bold"> NEW</span> : <span></span>}
                    </TableCell>

                    <TableCell align="center">{ticket?.movieShowTime}</TableCell>
                    <TableCell align="center">{ticket?.movieTheatre}</TableCell>
                    <TableCell align="center">{ticket?.paymentMethod}</TableCell>
                    <TableCell align="center">{ticket?.newAmount}</TableCell>
                    <TableCell align="center">
                      <div className="  text-center sm:px-6">
                        <button type="submit" onClick={navigate('/ticket', { state: ticket?._id })} className="inline-flex justify-center rounded-md bg-blue-900 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                          view
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description={
              <span>
                <a href="#API">NO TICKETS</a>
              </span>
            }
          >
            <Button type="primary" onClick={navigate('/movies')}>
              Get tickets !
            </Button>
          </Empty>
        )}
      </div>
    </div>
  );
};
export default TicketList;
