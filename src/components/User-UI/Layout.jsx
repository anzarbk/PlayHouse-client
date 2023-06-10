import React, { useState, useEffect } from 'react';
import Navbar from '../../components/User-UI/Navbar';
import Footer from '../../components/User-UI/Footer';
import { useSelector } from 'react-redux';
import TheatreNavbar from '../Theatre-UI/TheatreNavbar';

const Layout = ({ children }) => {
  const currentRole = useSelector((state) => state?.role?.data); //##### This function for fetch data from redux
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = () => {
      if (currentRole === 'theatre') {
        setUserRole(currentRole);
      }
    };
    role();
  }, [currentRole]);
  return (
    <div className="">
      <div>
        <div>{userRole ? <TheatreNavbar /> : <Navbar />}</div>
      </div>
      <div className="overflow-hidden">{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
