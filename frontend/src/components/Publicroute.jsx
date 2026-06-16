import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

const Publicroute = () => {

    let {user}= useSelector((state)=>state.auth)
if(!user){
  return <Navigate to="/"/>
}
  return (
    <div>
      <Outlet/>
    </div>
  );
}

export default Publicroute;
