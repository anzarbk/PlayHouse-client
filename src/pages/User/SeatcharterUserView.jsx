import React, { useState, useEffect } from 'react';
import Layout from '../../components/User-UI/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { createTicketAPI, getSeatCharterDataBYNameAPI, getShowDataByIdAPI } from '../../APIs/Theatre';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { getImagePath } from '../../utils/tmdb';
import { userDataActions } from '../../redux/userSlice';
import Navbar from '../../components/User-UI/Navbar';
//sdgvdfgdfgdfgd
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Loading from '../../components/Others/Loading';
//alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SeatcharterUserView = () => {
  const [showDetail, setShowDetail] = useState({});
  const location = useLocation();
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [populatedShow, setPopulatedShow] = useState({});

  const [newSeats, setNewSeats] = useState([]);
  const [finale, setFinale] = useState([]);
  const [row, setRow] = useState();
  const navigate = useNavigate();

  const [seatNameArray, setSeatNameArray] = useState([]);
  let [amount, setAmount] = useState(0);
  let [orderId, setOrderId] = useState(0);
  let [newAmount, setNewAmount] = useState(0);
  const [image, setImage] = useState('');
  const [seatError, setSeatError] = useState('');
  const [preloader, setPreloader] = useState(false);

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [walletError, setWalletError] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [sucess, setSucess] = useState(null);
  const [roleButton, setRoleButton] = useState(false);
  const [seatUpdates, setSeatUpdates] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // setSeats(seat1?.)
  const currentUserToken = useSelector((state) => state?.token?.data);
  const seatBooking = () => {};
  useEffect(() => {
    async function invoke() {
      const { show } = location?.state;
      // setShowDetail(show);
      setPopulatedShow(show);
      setId(show._id);
      console.log(show);
      const showss = await getShowDataByIdAPI(show._id, currentUserToken);
      if (showss.status) {
        console.log(showss);
        setShowDetail(showss.show[0]);
      }
      // const seat = show.screen.screenName;
      const length = showss.show[0].screen.seatCharter.length;
      setNewSeats(showss.show[0].screen.seatCharter);
      setRow(showss.show[0].screen.seatCharter[length - 1].row);
    }
    invoke();
  }, [seatUpdates]);

  useEffect(() => {
    setPreloader(true);
    const final = [];
    for (let i = 0; i < row; i++) {
      final.push(<RowComp arr={newSeats} row={i + 1} />);
    }
    setFinale(final);
    setPreloader(false);
  }, [newSeats]);

  let arr = [];
  const selectSeat = async (no) => {
    // console.log(no);
    setSeatError('');
    const seatClone = [...newSeats];
    seatClone.forEach((el) => {
      let price;
      if (el.seatNumber === no) {
        if (el.isBooked) {
          setSeatError('Seat already booked');
          return;
        }
      }
      if (el.seatNumber === no) {
        if (el.isSelected) {
          el.isSelected = !el.isSelected;
          if (seatNameArray.includes(el.seatNumber)) {
            const index = seatNameArray.indexOf(el.seatNumber);

            if (index > -1) {
              seatNameArray.splice(index, 1);
            }
            // seatNameArray.pop(el.seatNumber);
          }
          // setSeatNameArray(seatNameArray);
          setNewAmount((prev) => prev - showDetail.price);
        } else {
          el.isSelected = !el.isSelected;
          console.log(el);
          if (!seatNameArray.includes(el.seatNumber)) {
            seatNameArray.push(el.seatNumber);
          }
          // setSeatNameArray(arr);
          setNewAmount((prev) => prev + showDetail.price);
        }
      }
    });

    setNewSeats(seatClone);
  };

  const RowComp = ({ arr, row }) => {
    const [isSelected, setIsSelected] = useState(false);
    return (
      <div className="flex justify-center  w-[65vw] my-3 gap-3 ">
        {arr.map((el) => {
          if (el.row === row)
            return (
              <div key={el.seatNumber} className={`cursor-pointer ${el.isBooked ? 'bg-red-600 border-red-600 border-solid border-2 cursor-not-allowed' : el?.isSelected ? 'bg-green-600 border-green-600 border-solid border-2' : el.isAvailable ? 'border-green-600 border-solid border-2' : 'invisible border-solid border-2'}`}>
                <p
                  key={el.seatNumber}
                  className="w-4 h-4"
                  onClick={() => {
                    selectSeat(el.seatNumber);
                  }}
                ></p>
              </div>
            );
        })}
      </div>
    );
  };

  const handleApprove = async (orderID, populatedShow, showDetail, amount, seat) => {
    //backend function
    const data = {
      show: showDetail,
      orderID: orderID,
      movieName: populatedShow?.movie?.title,
      movieDate: populatedShow?.Date,
      movieTheatre: populatedShow?.theatre?.name,
      movieScreen: showDetail?.screen?.screenName,
      movieShowTime: populatedShow?.show,
      newAmount: amount,
      seatNameArray: seat,
      seats: newSeats,
    };
    console.log(data);
    const ticket = await createTicketAPI(data, currentUserToken);
    const ticketData = ticket.ticket;
    if (ticket.status) {
      setPaidFor(true);
      setOpen(true);
      console.log(ticket.shows);
      setSeatUpdates(true);
      setSucess('Show Booked successfully');
      navigate('/success');
    }
  };
  const { wallet } = useSelector((state) => state?.user?.data); //##### This function for fetch data from redux
  console.log(wallet);

  const payWithWallet = () => {
    setOrderId(populatedShow._id);
  };

  const paymentWithWallet = async (orderID, populatedShow, showDetail, amount, seat) => {
    if (amount > wallet) {
      return setWalletError('insufficient amount');
    }
    const data = {
      show: showDetail,
      orderID: orderID,
      movieName: populatedShow?.movie?.title,
      movieDate: populatedShow?.Date,
      movieTheatre: populatedShow?.theatre?.name,
      movieScreen: showDetail?.screen?.screenName,
      movieShowTime: populatedShow?.show,
      newAmount: amount,
      seatNameArray: seat,
      seats: newSeats,
    };
    console.log(data);
    const ticket = await createTicketAPI(data, currentUserToken);
    const ticketData = ticket.ticket;
    if (ticket.status) {
      console.log(ticket);
      setPaidFor(true);
      setOpen(true);
      setSeatUpdates(true);
      setSucess('Show Booked successfully');
      dispatch(userDataActions.setUser(ticket?.user));
      navigate('/success');
    }
  };
  if (error) {
    alert(error);
  }

  useEffect(() => {
    if (orderId === populatedShow._id) {
      paymentWithWallet(orderId, populatedShow, showDetail, newAmount, seatNameArray);
    } else if (orderId) {
      handleApprove(orderId, populatedShow, showDetail, newAmount, seatNameArray);
    }
  }, [orderId]);
  return preloader ? (
    <Loading />
  ) : (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center mt-10 ">
        <div className="flex  justify-between px-2 py-2 gap-2">
          {finale.length !== 0 ? (
            <div className=" border-rose-600 border rounded p-3 overflow-auto">
              <div className="flex justify-center items-center border-slate-600 border rounded w-6/12 h-[12px] mb-[36px] mx-auto bg-slate-600">
                <p className="text-xs font-light text-white ">screen here</p>
              </div>
              {finale}
              {seatError && seatError ? <span className="flex justify-center text-sm text-red-600">{seatError}!</span> : <span></span>}
            </div>
          ) : (
            <p className="flex justify-center font-extrabold text-red-500"></p>
          )}
          <div className="flex flex-col  gap-4 w-auto items-center">
            {/* <PayPalScriptProvider options={initialOptions}> 
            //####################
            {/* <PayPalScriptProvider options={{ 'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
              <PayPalButtons style={{ layout: 'horizontal' }} />
            </PayPalScriptProvider> 
          //##################*/}
            <div className="px-2 py-2 bg-slate-300 rounded-md">
              <div className=" flex flex-col sm:flex-row rounded-md xl:flex-col justify-between items-center bg-gray-100  sm:py-0  px-2 w-96">
                <div className="flex flex-col justify-between  w-full space-y-2">
                  <p className=" text-xl md:text-2xl leading-normal text-gray-800">{populatedShow?.movie?.title}</p>
                  <p className=" text-xs md:text-xs leading-normal text-gray-800">{populatedShow?.Date}</p>
                  <p className=" text-lg md:text-lg leading-normal text-gray-800">{populatedShow?.theatre?.name}</p>
                  <p className=" text-xs md:text-xs leading-normal text-gray-800">{showDetail?.screen?.screenName}</p>
                  <p className=" text-xs md:text-xs leading-normal text-gray-800">{populatedShow?.show}</p>
                  <div className="flex flex-wrap gap-2">
                    {seatNameArray.map((el) => (
                      <p key={el} className=" text-sm md:text-sm leading-normal text-gray-800">
                        {el}
                      </p>
                    ))}
                  </div>
                  <p className="text-base font-semibold leading-none text-gray-600">₹{newAmount}</p>
                </div>
                <div className=" sm:mt-0 py-2 w-52 sm:w-96 xl:w-auto">
                  <img src={getImagePath(populatedShow?.movie?.poster_path)} />
                </div>
              </div>
              <p className="text-center text-sm">Pay here</p>
              <PayPalScriptProvider options={{ 'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: 'USD' }}>
                <PayPalButtons
                  style={{
                    color: 'silver',
                    layout: 'horizontal',
                    height: 48,
                    tagline: false,
                    shape: 'pill',
                  }}
                  // onClick={(data, actions) => {
                  //   const hasAlreadyBoughtTicket = false;
                  //   if (hasAlreadyBoughtTicket) {
                  //     setError('you already buy');
                  //     return actions.reject();
                  //   } else {
                  //     return actions.resolve();
                  //   }
                  // }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          description: 'polikk machu',
                          amount: {
                            value: 240,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                    setOrderId(data.orderID);
                  }}
                  onError={(err) => {
                    console.log(err);
                  }}
                  onCancel={() => {
                    //cancel message
                  }}
                />
              </PayPalScriptProvider>
              <span className="flex justify-center text-xs">OR</span>
              <div className="flex justify-center mt-2">
                <button type="submit" onClick={payWithWallet} className="inline-flex justify-center rounded-md bg-green-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  Pay with wallet
                </button>
                {walletError && walletError ? <span className="flex justify-center text-sm text-red-600">{walletError}!</span> : <span></span>}
              </div>
            </div>

            <button
              type="submit"
              onClick={() => {
                navigate(-1);
              }}
              className="inline-flex justify-center rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {sucess}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SeatcharterUserView;
