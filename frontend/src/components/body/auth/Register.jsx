import React, { useState } from 'react';
import axios from 'axios'
import { showErrorMessage, showSuccessMessage } from '../../../utils/notification';
import {isMatch} from '../../../utils/validation';
import {useNavigate} from 'react-router-dom'


const initialState = {
     name: '',
     email: '',
     password: '',
     cfPassword: '',
     err: '',
     success: ''
}


export const Register = () => {

  const history = useNavigate()

  const [user, setUser] = useState(initialState)

  const {name, email, password, cfPassword, err, success} = user
  
  const handleInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value, err: '', success: ''})
  }

  const handleSubmit = async e => {
e.preventDefault()

if (!isMatch(password, cfPassword)) {
  return setUser ({...user, err: 'Password does not match', success: ''})
}

try {
  const res = await axios.post('/user/register', {
   name,    
   email: email.toLocaleLowerCase(),
    password
  })

  setUser({...user, err: '', success: res.data.msg})

  history('/login')
  
  
} catch (err) {
  err.response.data.msg && setUser({...user, err: err.response.data.msg, success: ''})
}

  }


  return <div className='max-w-sm mx-auto pt-12'>
    <h1 className='text-2xl font-bold tracking-wider pb-8'>Register</h1>
    {err && showErrorMessage(err)}
    {success && showSuccessMessage(success)}




    <form onSubmit={handleSubmit}>

    <div className='flex flex-col gap-2 w-3/4 pb-4'>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name"  value={name}  onChange={handleInput}
        placeholder="Name" className='p-2 text-black rounded' />
      </div>


      <div className='flex flex-col gap-2 w-3/4 pb-4'>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email"  value={email}  onChange={handleInput}
        placeholder="Email address" className='p-2 text-black rounded' />
      </div>

      <div className='flex flex-col gap-2 w-3/4 pb-4'>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password"  value={password} onChange={handleInput}
        placeholder="Password" className='p-2 text-black rounded' />
      </div>

      <div className='flex flex-col gap-2 w-3/4 pb-4'>
        <label htmlFor="cfPassword">Confirm Password</label>
        <input type="password" id="cfPassword" name="cfPassword"  value={cfPassword} onChange={handleInput}
        placeholder="Confirm Password" className='p-2 text-black rounded' />
      </div>
        
        
      <div className='flex justify-end w-3/4'>
        <button type='submit' className='px-6 py-1 bg-white text-black'>Register</button>
      </div>

       
   
    </form>

  </div>
}


