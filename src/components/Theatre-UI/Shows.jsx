import React, { useState, useEffect } from 'react';
import { tmdbAllMovies } from '../../utils/tmdb';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';
import { addShowAPI, getSeatCharterDataAPI, getShowTimeAPI, getTheatreDataAPI } from '../../APIs/Theatre';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
//alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Shows() {
  const currentUserToken = useSelector((state) => state?.token?.data);
  const currentUserId = useSelector((state) => state?.user?.data?._id);
  const currentTheatreId = useSelector((state) => state?.theatre?.data?._id); //##### This function for fetch data from redux
  const [open, setOpen] = React.useState(false);
  const [sucess, setSucess] = useState(null);
  const [roleButton, setRoleButton] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  let today = Date.now();

  const [value, setValue] = React.useState(dayjs(today));
  const [value2, setValue2] = React.useState(dayjs(today));
  const [movie, setMovie] = useState([]);
  const [array, setArray] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();
  const [price, setPrice] = useState(0);
  const [screen, setScreen] = useState();
  const [serverMovie, setServerMovie] = useState();
  const [showTime, setShowTime] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState('');

  const [selectedShow, setSelectedShow] = useState();

  // const arr2 = [];
  useEffect(() => {
    async function getMovies() {
      const movies = await tmdbAllMovies(1);
      setMovie(movies.data.results);

      const theatre = await getTheatreDataAPI(currentUserId, currentUserToken);
      if (theatre.status) {
        const SeatCharter = await getSeatCharterDataAPI(theatre.theatre[0]._id, currentUserToken);
        if (SeatCharter.status) {

          setArray(SeatCharter.seatcharter);

        }
        // }
        const sTime = await getShowTimeAPI(currentUserToken);
        if (sTime.status) {
          setShowTime(sTime.sTime);
        }
      }
    }
    getMovies();
  }, []);

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setSelectedItems((selectedItems) => (selectedItems.includes(value) ? selectedItems.filter((item) => item !== value) : [...selectedItems, value]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toServer = {
      startate: value,
      endDate: value2,
      movie: serverMovie,
      screen,
      price: price,
      show: selectedItems,
    };
    const data = await addShowAPI(toServer, currentUserToken);
    if (data?.status === 'success') {
      setOpen(true);
      setSucess('Show Updated successfully');
      // dispatch(userDataActions.setUser(data?.redux));
      setError('');
      setRoleButton(true);
    }
    if (data?.status === 'failed') {
      setError(data.message);
    }
  };

  return (
    <div className="flex justify-center mt-20 gap-2">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 border p-4 rounded   ">
          <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ display: 'flex flex-col' }}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              <DatePicker label="Start" defaultValue={dayjs(today)} value={value} onChange={(newValue) => setValue(newValue)} disablePast />
              <DatePicker label="End" value={value2} onChange={(newValue) => setValue2(newValue)} disablePast minDate={value} />
            </DemoContainer>
          </LocalizationProvider>
          {movie.length > 0 && (
            <Autocomplete
              disablePortal
              id="combo-box-demo-1"
              value={selectedMovie}
              onInputChange={(event, value) => {
                setSelectedMovie(value);
                const movieIdx = movie.findIndex((m) => m.original_title === value);
                if (movieIdx !== -1) setServerMovie(movie[movieIdx]);
              }}
              options={movie}
              getOptionLabel={(option) => option.original_title || ''}
              sx={{ width: 540 }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          )}
          {array.length > 0 && (
            <Autocomplete
              disablePortal
              id="combo-box-demo-2"
              value={screen}
              onInputChange={(event, value) => {
                setScreen(value);
              }}
              options={array}
              sx={{ width: 540 }}
              getOptionLabel={(option) => option.screenName || ''}
              renderInput={(params) => <TextField {...params} label="Screen" />}
            />
          )}
          <TextField
            id="outlined-number"
            label="Ticket Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">SHOW TIME</FormLabel>
            <FormGroup>
              {showTime.map((item) => (
                <FormControlLabel key={item.showName} control={<Checkbox checked={selectedItems.includes(item.showName)} onChange={handleCheckboxChange} value={item.showName} />} label={item.showName} />
              ))}
            </FormGroup>
          </FormControl>

          {error ? <span className="text-sm text-red-600">{`${error}`}</span> : <span></span>}
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button type="submit" className="inline-flex justify-center rounded-md bg-blue-900 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            Save
          </button>
        </div>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {sucess}
        </Alert>
      </Snackbar>
    </div>
  );
}


