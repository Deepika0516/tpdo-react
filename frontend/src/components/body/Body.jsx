
import {Routes, Route} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Index} from '../Index'
import {Login} from './auth/Login'
import {Register} from './auth/Register'
import {Dashboard} from './dashboard/Dashboard'
import {Create} from './dashboard/create'
import {Edit} from './dashboard/Edit'


export const Body = () => {
  const auth = useSelector(state => state.auth)
  const {isLoggedIn} = auth
  return <div className='text-white p-4'>
     
      <Routes>
<Route path='/' element={isLoggedIn ? <Dashboard /> : <Index /> } />
<Route path='/login' element={isLoggedIn ? <Dashboard /> : <Login /> } />
<Route path='/register' element={isLoggedIn ? <Dashboard /> : <Register /> } />
<Route path='/dashboard' element={isLoggedIn ? <Dashboard /> : <Login /> } />
<Route path='/create' element={isLoggedIn ? <Create /> : <Login /> } />
<Route path='/edit/:id' element={isLoggedIn ? <Edit /> : <Login /> } />

      </Routes>

  </div>;
};
