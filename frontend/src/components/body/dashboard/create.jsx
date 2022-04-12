import { useState } from 'react';
import { showErrorMessage, showSuccessMessage } from '../../../utils/notification';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useSelector} from 'react-redux'

const initialState = {
    title: '',
    desc: '',
    err: '',
    success: ''
}

export const Create = () => {

    const history = useNavigate()

const token = useSelector(state => state.token)

const [task, setTask] = useState(initialState)


const {title, desc, err, success} = task

const handleInput = (e) => {
    const {name, value } = e.target
    setTask({...task, [name]:value, err: '', success: ''})
}
 const handleSubmit = async e => {
  e.preventDefault()
  try {
      const res = await axios.post('/user/create', {
          title,
          desc
      },
      {
          headers: {Authorization: token}
      })

      setTask({...task, err: '', success: res.data.msg})

      history('/dashboard')
      
  } catch (err) {
      err.response.data.msg && setTask({...task, err: err.response.data.msg, success: ''})
      
  }
 }

  return <div className='max-w-sm mx-auto pt-12'>
      {err && showErrorMessage(err)}
      {success && showSuccessMessage}

<form onSubmit={handleSubmit}>

<div className='flex flex-col gap-2 w-3/4 pb-4'>
  <label htmlFor="title">Title</label>
  <input type="text" id="title" name="title"  value={title}  onChange={handleInput}
  placeholder="Title" className='p-2 text-black rounded' />
</div>

<div className='flex flex-col gap-2 w-3/4 pb-4'>
  <label htmlFor="desc">Description</label>
  <textarea type="text" id="desc" name="desc"  value={desc}  onChange={handleInput}
  placeholder="description" className='p-2 text-black rounded' rows="4" cols="50"/>
</div>
  
<div className='flex justify-end w-3/4'>
  <button type='submit' className='px-6 py-1 bg-white text-black'>Create</button>
</div>

</form>



  </div>;
};
