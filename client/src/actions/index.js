import axios from 'axios'
import { FETCH_USER } from './types'

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/currentuser')
    dispatch({ type: FETCH_USER, payload: res.data }) //only dispatch the response once we have the action
}

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token)
    dispatch({ type: FETCH_USER, payload: res.data }) 
}