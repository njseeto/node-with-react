import axios from 'axios'
import { FETCH_USER } from './types'

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/currentuser')
    dispatch({ type: FETCH_USER, payload: res }) //only dispatch the response once we have the action
}