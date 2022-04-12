import {BrowserRouter as Router} from 'react-router-dom' 
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchLogin, dispatchUser, fetchUser } from './redux/actions/authActions'

import {Body} from './components/body/Body'
import {Header} from './components/header/Header'

import axios from 'axios'

function App() {

  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  
useEffect(() => {
  const taskLogin = localStorage.getItem('taskLogin')

  if(taskLogin) {
    const getToken = async () => {
      const res = await axios.post('/user/refreshToken', null)
      dispatch({type: 'GET_TOKEN', payload: res.data.accessToken})
    }
    getToken()
  }
}, [auth.isLoggedIn, dispatch])

useEffect(() => {
  if (token) {
    const getUser = () => {
      dispatch(dispatchLogin())
      return fetchUser(token).then(res => {
        dispatch(dispatchUser(res))
      })
    }
    getUser()
  }
}, [token, dispatch])


  return (
    <Router>
     
     <div className='h-screen bg-gray-500 p-2'>
     <div className='max-w-4xl mx-auto bg-black shadow h-full rounded-xl'>
    
    <Header />
    <Body />
   
   </div>
  
 </div>
    </Router>
  );
}

export default App;





