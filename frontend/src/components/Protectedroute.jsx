import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router';

const Protectedroute = () => {

    let {user}= useSelector((state)=>state.auth)
if(user){
  return <Navigate to="home"/>


}
  return (
    <div>
        <Outlet/>
    </div>
  );
}

export default Protectedroute;
