
import React from 'react';
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'; 



export const Dashboard = () => {
   

  const auth = useSelector (state => state.auth)
  const token = useSelector(state => state.token)
  const { user } = auth
 
const [task, setTask] = useState([])

  useEffect(() => {
    const getTask = async () => {
      const res = await axios.get('/user/task', {
        headers: {Authorization: token}
      })
      setTask(res.data)
    }
    getTask()
  }, [token])
  
  const deleteTask = async (id) => {
    await axios.delete(`/user/delete/${id}`, {
      headers: {Authorization: token}
    })
   window.location.reload(false)

  }

  const statusUpdate = async (id) => {
    await axios.patch(`/user/status/${id}`, null,{
      headers: {Authorization: token}
    })

   window.location.reload(false)

  }
   
  return <div>
<div className='flex w-full justify-between mb-4'>
<h1 className='text-xl font-bold tracking-wider'>Hello {user.name}!</h1>
<Link to="/create" className='w-32 text-center px-4 py-1 rounded-full bg-orange-500'>New Task</Link>
</div>

<div className='grid grid-cols-3 gap-4'>
  {
    task.map(t => ( 
      <div className='flex flex-col justify-between h-60 bg-white text-black p-4 rounded-xl bg-slate-100' key={t._id}>
        <div>
          <div className='flex justify-end'>
            <span className='text-sm py-1 px-4 rounded-full bg-red-300'>{t.status ? "Active" : "Completed"}</span>
            </div>
     
      <h1 className='mt-4 text-2xl font-bold tracking-wide pb-4'>{t.title}</h1>
        <p className='text-lg pb-4'>{t.desc}</p>
        </div>
        
        <div className='flex gap-4 justify-end'>
          <Link to={`/edit/${t._id}`} className='w-24 px-2 py-1 bg-red-400' >Edit</Link>
          <button className='w-24 px-2 py-1 bg-red-400' onClick={() => deleteTask(t._id)} >Delete</button>
       </div>

<div className='flex pt-4'>
   <button className='w-24 px-2 py-1 bg-green-400' onClick={() => statusUpdate(t._id)} >Completed</button>
   </div>
  </div>
     ) )
}
</div>
</div>;
  
};
