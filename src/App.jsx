import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3000');
import Home from './pages/User/Home';
import Theatre from './pages/Theatre/Theatre';
// import Hall from './pages/Others/Hall';
// import Concert from './pages/Others/Concert';
import Profile from './pages/User/Profile';
// import Movie from './pages/Others/Movie';
import './App.css';
import MovieShow from './pages/Theatre/MovieShow';
import Movies from './pages/User/Movies';
import TalkShow from './pages/User/TalkShow';
import MusicConcert from './pages/User/MusicConcert';
import SelectedMovie from './pages/User/SelectedMovie';
import SeatCharter from './pages/Theatre/SeatCharter';
import AdminRoutes from './routes/AdminRoutes';
import Dashboard from './pages/Theatre/Dashboard';
import TheatreList from './pages/Theatre/TheatreList';
import ScreenList from './pages/Theatre/ScreenList';
import ShowsList from './pages/Theatre/ShowsList';
import ShowTime from './pages/Theatre/ShowTime';
import ShowTimeList from './pages/Theatre/ShowTimeList';
import SeatcharterView from './pages/Theatre/SeatcharterView';
import SeatcharterUserView from './pages/User/SeatcharterUserView';
import Ticket from './pages/User/Ticket';
import TicketList from './pages/User/TicketList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/theatre" element={<Theatre />} />
        <Route path="/seatcharter" element={<SeatCharter />} />
        <Route path="/seatcharter-view" element={<SeatcharterView />} />
        <Route path="/seatcharter-user-view" element={<SeatcharterUserView />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/ticket-list" element={<TicketList />} />
        <Route path="/show-time" element={<ShowTime />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/theatre-list" element={<TheatreList />} />
        <Route path="/screen-list" element={<ScreenList />} />
        <Route path="/shows-list" element={<ShowsList />} />
        <Route path="/show-time-list" element={<ShowTimeList />} />
        {/* <Route path="/hall" element={<Hall />} /> */}
        {/* <Route path="/concert" element={<Concert />} /> */}
        {/* <Route path="/movie" element={<Movie />} /> */}
        <Route path="/show" element={<MovieShow />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/talkshow" element={<TalkShow />} />
        <Route path="/musicconcert" element={<MusicConcert />} />
        <Route path="/movies/selected" element={<SelectedMovie />} />
      </Routes>
    </Router>
  );
}

export default App;