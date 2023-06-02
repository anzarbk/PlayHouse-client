import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getImagePath } from '../../utils/tmdb';
import { Document, Page } from 'react-pdf';
import Navbar from '../../components/User-UI/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { userDataActions } from '../../redux/userSlice';
import { deleteTicketAPI, getTicketAPI } from '../../APIs/Theatre';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import dayjs from 'dayjs';
//alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Ticket = () => {
  const location = useLocation();
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [sucess, setSucess] = useState(null);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const [ticket, setTicket] = useState();
  const [ID, setID] = useState();
  const [datas, setDatas] = useState();
  const [img, setImg] = useState();
  const [ticketId, setTicketId] = useState();
  const [movieImage, setMovieImage] = useState();
  const [showId, setShowId] = useState();

  useEffect(() => {
    async function invoke() {
      const dbTicket = await getTicketAPI(id, currentUserToken);
      if (dbTicket.status) {
        console.log(dbTicket.ticket);
        setTicket(dbTicket.ticket);
        setTicketId(dbTicket?.ticket?._id);
        setMovieImage(dbTicket.ticket.movieShowId.movie.poster_path);
        setShowId(dbTicket.ticket.movieShowId);
      }
    }
    invoke();
    // setTickets(populatedShow);
    // setImg(getImagePath(populatedShow?.movie?.poster_path));
    // setDatas(ticketData);
  }, [id]);
  const currentUserToken = useSelector((state) => state?.token?.data);
  const cancelTicket = async () => {
    console.log(id);
    const dataV = {
      ticketId,
      showId,
    };
    const cancel = await deleteTicketAPI(dataV, currentUserToken);
    if (cancel.status) {
      setOpen(true);
      console.log(cancel);
      setSucess('ticket cancelled successfully');
      dispatch(userDataActions.setUser(cancel?.user));
      navigate('/ticket-list');
    }
  };
  return (
    <div>
      <Navbar />
      <div className="py-14 w-full">
        <div className="lg:flex items-center justify-center w-full">
          <div className="lg:w-4/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded">
            <div className="flex justify-center border-b border-gray-200 pb-6">
              <div className=" flex flex-col sm:flex-row rounded-md xl:flex-col justify-center items-center bg-gray-100  sm:py-0 border-black border-2 px-2 w-96">
                <div className="flex flex-col justify-between  w-full space-y-2">
                  {ticket && (
                    <>
                      <p className=" text-xl md:text-2xl leading-normal text-gray-800">{ticket?.movieName}</p>
                      <p className=" text-xs md:text-xs leading-normal text-gray-800">{dayjs(ticket?.movieDate).format('LL')}</p>
                      <p className=" text-lg md:text-lg leading-normal text-gray-800">{ticket?.movieTheatre}</p>
                      <p className=" text-xs md:text-xs leading-normal text-gray-800">{ticket?.movieScreen}</p>
                      <p className=" text-xs md:text-xs leading-normal text-gray-800">{ticket?.movieShowTime}</p>
                    </>
                  )}
                  <div className="flex flex-wrap gap-2">{ticket && <p className=" text-sm md:text-sm leading-normal text-gray-800">{ticket?.seatNameArray.map((el) => `${el} `)}</p>}</div>
                  {ticket && <p className="text-base font-semibold leading-none text-gray-600">₹{ticket.newAmount}</p>}
                  <p className="text-xl font-semibold leading-none text-gray-600">Ticket ID :{ticket?._id.substring(0, 5)}</p>
                </div>
                <div className=" sm:mt-0 py-2 w-52 sm:w-96 xl:w-auto">
                  {' '}
                  <img src={getImagePath(movieImage)} />{' '}
                </div>
              </div>
            </div>
            <div className="px-2">
              <div className="flex">
                <div className="mt-2">
                  {/* <button className="py-2 px-4 text-sm leading-3 text-white-700 rounded-full bg-green-600">Download</button> */}
                  <button className="py-2 px-4 ml-3 text-sm leading-3 text-white-700 rounded-full bg-red-600" onClick={cancelTicket}>
                    cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div>
          <Document file="somefile.pdf">
            <Ticket />
          </Document>
          <p>Page</p>
        </div> */}
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="cancel" sx={{ width: '100%' }}>
          {sucess}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Ticket;
