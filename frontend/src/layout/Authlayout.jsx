import React from 'react';
import { useState } from 'react';
import Register from '../components/Register';
import Login from '../components/Login';

const Authlayout = () => {
  const [toggle, setToggle] = useState(false)
    return (
    <div>
     {toggle?<Register setToggle={setToggle} />:<Login setToggle={setToggle} />}
    </div>
  );
}

export default Authlayout;
