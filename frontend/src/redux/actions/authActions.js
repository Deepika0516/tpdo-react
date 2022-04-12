import ACTIONS from './index'
import axios from 'axios'

export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}
export const fetchUser = async (token) => {
    const res = await axios.get('/user/info', {
        headers: {Authorization: token}
    })
    return res
}
export const dispatchUser = (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data
        }
    }
}