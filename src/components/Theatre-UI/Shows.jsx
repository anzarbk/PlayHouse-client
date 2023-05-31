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
//sdfsdfsdfsdf
// import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
//sdgvdfgdfgdfgd
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
//alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Shows() {
  const currentUserToken = useSelector((state) => state?.token?.data);
  const currentUserId = useSelector((state) => state?.user?.data?._id);
  console.log(currentUserId); //##### This function for fetch data from redux
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
      console.log(movies.data.results);
      setMovie(movies.data.results);

      const theatre = await getTheatreDataAPI(currentUserId, currentUserToken);
      console.log(theatre);
      if (theatre.status) {
        const SeatCharter = await getSeatCharterDataAPI(theatre.theatre[0]._id, currentUserToken);
        if (SeatCharter.status) {
          console.log(SeatCharter);
          setArray(SeatCharter.seatcharter);
          console.log(array);
          // const nbrOfScreen = SeatCharter.seatcharter.seatCharter.length;
          // createScreenName(nbrOfScreen);
        }
        // }
        const sTime = await getShowTimeAPI(currentUserToken);
        if (sTime.status) {
          console.log(sTime);
          setShowTime(sTime.sTime);
          console.log(sTime.sTime);
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
    // console.log(selectedMovie);
    // if ({ selectedMovie12: selectedMovie }) {
    // const mov = selectedMovie;
    // console.log(movie);
    // const movieIdx = movie.findIndex((m) => m.original_title === selectedMovie);
    // if (movieIdx !== -1) setServerMovie(movie[movieIdx]);
    // for (let i = 0; i < movie.length; i++) {
    //   console.log(movie[i].original_title);
    //   if (selectedMovie === movie[i].original_title) {
    //     console.log({ movie12: movie[i] });
    //     setServerMovie(movie[i]);
    //   }
    // }
    // }
    // console.log(selectedShow);
    // if (showTime) {
    //   for (let i = 0; i < showTime.length; i++) {
    //     if (selectedShow === showTime[i].showName) {
    //       setServerShowTime(showTime[i]);
    //       console.log(serverShowTime);
    //     }
    //   }
    // }
    const toServer = {
      startate: value,
      endDate: value2,
      movie: serverMovie,
      screen,
      price: price,
      show: selectedItems,
    };
    console.log({ toServer });
    const data = await addShowAPI(toServer, currentUserToken);
    console.log(data);
    if (data?.status === 'success') {
      setOpen(true);
      setSucess('Show Updated successfully');
      // dispatch(userDataActions.setUser(data?.redux));
      setError('');
      setRoleButton(true);
    }
    if (data?.status === 'failed') {
      console.log(data);
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

// import React, { useState, useEffect } from 'react';
// import { tmdbAllMovies } from '../utils/tmdb';
// import { lengthChecker } from '../utils/validators';
// import { DemoItem } from '@mui/material';
// // import DatePicker from './DatePicker';

// const Shows = () => {
//   const [movie, setMovie] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState();
//   const changeMovie = (e) => {
//     setSelectedMovie(e.target.value);
//   };

//   const [screen, setScreen] = useState();
//   const [screenError, setScreenError] = useState(false);
//   const changeScreen = (e) => {
//     setScreenError(false);
//     setScreen(e.target.value);
//   };

//   const [showName, setShowName] = useState();
//   const [showNameError, setShowNameError] = useState(false);
//   const changeShowName = (e) => {
//     setShowNameError(false);
//     setShowName(e.target.value);
//   };

//   const [time, setTime] = useState();
//   const [timeError, setTimeError] = useState(false);
//   const changeTime = (e) => {
//     setTimeError(false);
//     setTime(e.target.value);
//   };

//   const [date, setDate] = useState();
//   const [dateError, setDateError] = useState(false);
//   const changeDate = (e) => {
//     setDateError(false);
//     setDate(e.target.value);
//   };
//   const validateData = () => {
//     if (!lengthChecker(screen, 1, 15)) return;
//     if (!lengthChecker(showName, 1, 15)) return;
//     if (!lengthChecker(screen, 1, 15)) return;
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dataV = validateData();
//   };

//   useEffect(() => {
//     async function getMovies() {
//       const movies = await tmdbAllMovies(1);
//       setMovie(movies.data.results);
//     }
//     getMovies();
//   }, []);

//   return (
//     <div className=" overflow-hidden shadow sm:rounded-md">
//       {/* <DatePickers /> */}
//       <div className="w-full gap-8 bg-white px-4 py-5 sm:p-6 flex justify-center">
//         <div className="w-46 h-fit bg-slate-300 shadow shadow-slate-600  p-5 ">
//           <form onSubmit={handleSubmit}>
//             <div className="col-span-6 sm:col-span-4 ">
//               <label htmlFor="language" className="block text-sm font-medium leading-6 text-gray-900">
//                 movie
//               </label>
//               <select id="movie" value={selectedMovie} name="movie" onChange={changeMovie} autoComplete="country-name" className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
//                 {movie?.length === 0 && <option value={''}>{'Could not load movie data'}</option>}
//                 {movie?.length > 0 &&
//                   movie?.map((mov) => (
//                     <option key={mov.original_title} value={mov.original_title}>
//                       {mov.original_title}
//                     </option>
//                   ))}
//               </select>
//               {/* {movieError ? <span className="text-sm text-red-600">{`"${movie}" is an invalid input !`}</span> : <span></span>} */}
//             </div>
//             <div className="col-span-6 sm:col-span-4">
//               <DemoItem label="Uncontrolled picker" component="DateRangePicker">
//                 <DateRangePicker defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]} />
//               </DemoItem>
//               <DemoItem label="Controlled picker" component="DateRangePicker">
//                 <DateRangePicker value={value} onChange={(newValue) => setValue(newValue)} />
//               </DemoItem>
//             </div>
//             <div className="col-span-6 sm:col-span-4">
//               <label htmlFor="language" className="block text-sm font-medium leading-6 text-gray-900">
//                 show name
//               </label>
//               <input type="text" value={showName} onChange={changeShowName} name="language" id="language" autoComplete="language" className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
//               {showNameError ? <span className="text-sm text-red-600">{`"${showName}" is an invalid input !`}</span> : <span></span>}
//             </div>
//             <div className="col-span-6 sm:col-span-4">
//               <label htmlFor="language" className="block text-sm font-medium leading-6 text-gray-900">
//                 time
//               </label>
//               <input type="text" value={time} onChange={changeTime} name="language" id="language" autoComplete="language" className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
//               {timeError ? <span className="text-sm text-red-600">{`"${time}" is an invalid input !`}</span> : <span></span>}
//             </div>
//             <div className="col-span-6 sm:col-span-4">
//               <label htmlFor="language" className="block text-sm font-medium leading-6 text-gray-900">
//                 Date
//               </label>
//               <input type="text" value={date} onChange={changeDate} name="language" id="language" autoComplete="language" className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
//               {dateError ? <span className="text-sm text-red-600">{`"${date}" is an invalid input !`}</span> : <span></span>}
//             </div>

//             <button type="submit" className="mt-5 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
//               Save
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shows;
