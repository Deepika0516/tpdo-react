

import { useState } from 'react';
import { showErrorMessage, showSuccessMessage } from '../../../utils/notification';
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { useEffect } from 'react';

const initialState = {
    title: '',
    desc: '',
    err: '',
    success: ''
}



export const Edit = () => {

    const history = useNavigate()
    
    const {id} = useParams()
    const token = useSelector(state => state.token)
    const [task, setTask] = useState({})


    useEffect(() => {
        const getTask = async () => {
            const res = await axios.get(`/user/task/${id}`, {
                headers: {Authorization: token}
            })
            setTask(res.data)
        }
        getTask()
    }, [id, token])
    
    const [data, setData] = useState(initialState)

    const {title, desc, err, success} = data
    
    const handleInput = (e) => {
        const {name, value } = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.patch(`/user/update/${id}`, {
                title: title ? title : task.title,
                desc: desc ? desc : task.desc,
            },
            {
                headers: {Authorization: token}
            })
      
            setData({...data, err: '', success: res.data.msg})
      
            history('/dashboard')
            
        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
            
        }
       }
 

  return <div className='max-w-sm mx-auto pt-12'>
      
      <form onSubmit={handleSubmit}>

      {err && showErrorMessage(err)}
      {success && showSuccessMessage(success)}


          <div className='flex flex-col gap-2 w-3/4 pb-4'>
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title"  defaultValue={task.title} onChange={handleInput}
              placeholder="Title" className='p-2 text-black rounded' />
              </div>
              
              <div className='flex flex-col gap-2 w-3/4 pb-4'>
                  <label htmlFor="desc">Description</label>
                  <textarea type="text" id="desc" name="desc"   defaultValue={task.desc} onChange={handleInput}
                  placeholder="description" className='p-2 text-black rounded' rows="4" cols="50"/>
                  </div>


  
<div className='flex justify-end w-3/4'>
  <button type='submit' className='px-6 py-1 bg-white text-black'>Update</button>
</div>

</form>
  </div>;
};
