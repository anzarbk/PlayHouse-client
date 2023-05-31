import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getImagePath } from '../../utils/tmdb';
import { Document, Page } from 'react-pdf';
import Navbar from '../../components/User-UI/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { userDataActions } from '../../redux/userSlice';
import { deleteTicketAPI } from '../../APIs/Theatre';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
//alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Ticket = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [sucess, setSucess] = useState(null);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const [tickets, setTickets] = useState();
  const [datas, setDatas] = useState();
  const [img, setImg] = useState();
  const [id, setId] = useState();
  useEffect(() => {
    const { ticketId } = location.state;
    setId(populatedShow._id);
    setTickets(populatedShow);
    setImg(getImagePath(populatedShow?.movie?.poster_path));
    setDatas(ticketData);
    // const dbTickets = await getTicketAPI()
  }, []);
  const currentUserToken = useSelector((state) => state?.token?.data);
  const cancelTicket = async () => {
    console.log(datas._id);
    const dataV = {
      ticketId: datas._id,
      showId: id,
    };
    const cancel = await deleteTicketAPI(dataV, currentUserToken);
    if (cancel.status) {
      setOpen(true);

      setSucess('ticket cancelled successfully');
      dispatch(userDataActions.setUser(cancel?.user));
      navigate('/');
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
                  {tickets && (
                    <>
                      <p className=" text-xl md:text-2xl leading-normal text-gray-800">{tickets?.movie?.title}</p>
                      <p className=" text-xs md:text-xs leading-normal text-gray-800">{tickets?.Date}</p>
                      <p className=" text-lg md:text-lg leading-normal text-gray-800">{tickets?.theatre?.name}</p>
                      <p className=" text-xs md:text-xs leading-normal text-gray-800">{tickets?.screen?.show}</p>
                      <p className=" text-xs md:text-xs leading-normal text-gray-800">{tickets?.show}</p>
                    </>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {datas &&
                      datas.seatNameArray.map((el) => (
                        <p key={el} className=" text-sm md:text-sm leading-normal text-gray-800">
                          {el}
                        </p>
                      ))}
                  </div>
                  {datas && <p className="text-base font-semibold leading-none text-gray-600">₹{datas.newAmount}</p>}
                  <p className="text-xl font-semibold leading-none text-gray-600">Ticket ID :{tickets?._id.substring(0, 5)}</p>
                </div>
                <div className=" sm:mt-0 py-2 w-52 sm:w-96 xl:w-auto">
                  {' '}
                  <img src={img} />{' '}
                </div>
              </div>
            </div>
            <div className="px-2">
              <div className="flex">
                <div className="mt-2">
                  <button className="py-2 px-4 text-sm leading-3 text-white-700 rounded-full bg-green-600">Download</button>
                  <button className="py-2 px-4 ml-3 text-sm leading-3 text-white-700 rounded-full bg-red-600" onClick={cancelTicket}>
                    cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Document file="somefile.pdf">
            <Ticket />
          </Document>
          <p>Page</p>
        </div>
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
