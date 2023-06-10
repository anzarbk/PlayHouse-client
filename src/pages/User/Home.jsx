import React from 'react';
import Footer from '../../components/User-UI/Footer';
import Navbar from '../../components/User-UI/Navbar';
import Banner from '../../components/User-UI/Banner';
import Movies from '../../components/User-UI/Movies';
import StandUp from '../../components/User-UI/StandUp';
import MusicConcert from '../../components/User-UI/MusicConcert';



function home() {
  return (
    <div className="grid">
      <div>
        <div>
          <Navbar />
          <Banner />
        </div>
        <div className="flex flex-col gap-2 mt-8">
          <Movies />
          <StandUp />
          <MusicConcert />

        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default home;
