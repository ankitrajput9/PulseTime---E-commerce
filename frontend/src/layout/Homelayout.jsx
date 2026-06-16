import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const Homelayout = () => {
  return (
    <div >
      <div className="fixed top-0  w-full z-101" >
      <Navbar/>
      </div>
      <div className="">
    <Outlet/>
      </div>
  
    </div>
  );
}

export default Homelayout;
