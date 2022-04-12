import React from 'react';
import {Link} from 'react-router-dom'

import { useSelector } from 'react-redux'
import axios from 'axios'

export const Header = () => {
   const auth = useSelector(state => state.auth)
   const { user, isLoggedIn } = auth

   const handleLogout = async () => {
      try {
         await axios.get('/user/logout')
         localStorage.removeItem('tasklogin')
   window.location.href = "/"         
      } catch (err) {
         window.location.href = "/"
         
      }

   } 



  return <div className='flex h-16 bg-white rounded-t-xl justify-between px-4 py-2'>
    
     <Link to="/" className='text-xl tracking-wider font-bold'>
         Task Manager
         </Link>

{
   isLoggedIn ? 
   <div className='flex gap-8 text-md tracking-wide'>
      <Link to="/">{user.name}</Link>
      <Link to="/" onClick={handleLogout}>Logout</Link>
      </div>
:

     <div className='flex gap-8 text-md tracking-wide'>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
     </div>
}
  </div>;
};
