import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import Layout from '../../components/User-UI/Layout';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { addShowTimeAPI } from '../../APIs/Theatre';
import { format, parse, differenceInMinutes } from 'date-fns';
// import { isValid } from 'date-fns';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
//alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ShowTime = () => {
  const currentUserToken = useSelector((state) => state?.token?.data);
  const [timeError, setTimeError] = useState(false);
  const [showName, setShowName] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [open, setOpen] = React.useState(false);
  const [sucess, setSucess] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const showTimeValidation = (start, end) => {
    if (start && end) {
      const minuteInMS = 1000 * 60;
      const hourInMS = minuteInMS * 60;
      const startTime = start.$d.getTime();
      const endTime = end.$d.getTime();
      const hourDiff = (endTime - startTime) / hourInMS;
      return hourDiff;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = showTimeValidation(start, end);
    if (valid >= 4 || valid < 0.5) {
      setTimeError('Please choose time less than 4 hour or greater than half hour !');
      return;
    }

    const dataV = { showName, start, end };
    const data = await addShowTimeAPI(dataV, currentUserToken);
    if (data.status === 'success') {
      setOpen(true);
      setSucess('Show Updated successfully');
    }
  };
  return (
    <Layout>
      <div className="flex  justify-center items-center  shadow-red-300 mt-20 mb-10">
        <div className=" w-6/12 flex flex-col border p-4 items-center gap-6 ">
          <form onSubmit={handleSubmit}>
            <TextField required value={showName} onChange={(e) => setShowName(e.target.value)} label="Show name" defaultValue="" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticTimePicker
                orientation="landscape"
                value={start}
                onChange={(newStart) => {
                  setStart(newStart);
                  setTimeError('');
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticTimePicker
                orientation="landscape"
                value={end}
                onChange={(newEnd) => {
                  setEnd(newEnd);
                  setTimeError('');
                }}
                error={timeError}
                helperText={timeError ? `the time should be between 1-4 hours` : ''}
                componentsProps={{ actionBar: { actions: [] } }}
              />
            </LocalizationProvider>
            {timeError ? <span className="text-sm text-red-600">{`${timeError}`}</span> : <span></span>}
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button type="submit" className="inline-flex justify-center rounded-md bg-blue-900 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Save
              </button>
            </div>
          </form>
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

export default ShowTime;
