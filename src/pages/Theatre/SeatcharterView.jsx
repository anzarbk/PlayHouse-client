import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getSeatCharterSingleDataAPI, seatCharterAPI, updateCharterAPI } from '../../APIs/Theatre';
import Layout from '../../components/User-UI/Layout';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
//alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SeatcharterView = () => {
  const navigate = useNavigate();

  //#####
  const [open, setOpen] = React.useState(false);
  const [sucess, setSucess] = useState(null);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const location = useLocation();
  const [id, setId] = useState();
  const [seats, setSeats] = useState([]);
  const [screenName, setScreenName] = useState();
  const [nameError, setnameError] = useState(false);
  const changeName = (e) => {
    setnameError(false);
    setScreenName(e.target.value);
  };
  const [finale, setFinale] = useState([]);
  const [row, setRow] = useState();
  const [col, setCol] = useState();
  const { elementId } = location.state;

  const currentUserToken = useSelector((state) => state?.token?.data);

  useEffect(() => {
    async function getSeatCharters() {
      if (elementId) {
        const SeatCharter = await getSeatCharterSingleDataAPI(elementId, currentUserToken);
        if (SeatCharter.status) {
          setScreenName(SeatCharter.seat.screenName);
          setSeats(SeatCharter.seat.seatCharter);
          setId(SeatCharter.seat._id);
          const qwe = SeatCharter.seat.seatCharter;
          setRow(qwe[qwe.length - 1].row);
        }
      }
    }
    getSeatCharters();
  }, []);

  useEffect(() => {
    const final = [];
    for (let i = 0; i < row; i++) {
      final.push(<RowComp arr={seats} row={i + 1} />);
    }
    setFinale(final);
  }, [seats]);

  const selectSeat = async (no) => {
    const seatClone = [...seats];
    seatClone.forEach((el) => {
      if (el.seatNumber === no) {
        el.isAvailable = !el.isAvailable;
      }
    });

    setSeats(seatClone);
  };

  const uploadTheatre = async () => {
    const data = { id, seats, screenName };
    const charter = await updateCharterAPI(data, currentUserToken);
    if (charter.status === 'success') {
      setOpen(true);
      setSucess('seat Updated successfully');
    }
  };

  const RowComp = ({ arr, row }) => {
    return (
      <div className="flex justify-center  w-[75vw] my-3 gap-3 ">
        {arr.map((el) => {
          if (el.row === row)
            return (
              <div key={el.seatNumber} className={`border border-[skyblue] cursor-pointer ${el.isAvailable ? 'bg-[limegreen]' : 'bg-red-700'}  text-center`}>
                <p key={el.seatNumber} className="w-4 h-4" onClick={() => selectSeat(el.seatNumber)}></p>
              </div>
            );
        })}
      </div>
    );
  };
  return (
    <Layout>
      <div className="flex flex-col justify-center mt-10 gap-4">
        <div className="w-100vw flex justify-center mt-4 gap-4">
          <div className="col-span-6 sm:col-span-4">
            <label htmlFor="theatreName" className="block text-sm font-medium leading-6 text-gray-900">
              Screen name
            </label>
            <input type="text" name="theatreName" onChange={changeName} value={screenName} id="theatreName" autoComplete="given-name" className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            {nameError ? <span className="text-sm text-red-600">{`"${screenName}" is an invalid input !`}</span> : <span></span>}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          {finale.length !== 0 ? (
            <div className="m-auto border-rose-600 border rounded p-3 overflow-auto">
              <div className="border-black border rounded w-6/12 h-[12px] mb-[36px] mx-auto "></div>
              {finale}
            </div>
          ) : (
            <p className="flex justify-center font-extrabold text-red-500">Please input values !</p>
          )}
          <div className="flex justify-center bg-gray-50 px-4  pb-16 pt-20 text-right sm:px-6">
            {seats.length !== 0 ? (
              <button type="submit" className="inline-flex justify-center rounded-md bg-green-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" onClick={uploadTheatre}>
                Upload the theatre
              </button>
            ) : (
              ''
            )}
          </div>
          <div className="flex justify-center bg-gray-50 px-4  pb-16 pt-20 text-right sm:px-6">
            {seats.length !== 0 ? (
              <button type="submit" className="inline-flex justify-center rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" onClick={() => navigate('/screen-list')}>
                Go back
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {sucess}
          </Alert>
        </Snackbar>
      </div>
    </Layout>
  );
};

export default SeatcharterView;
