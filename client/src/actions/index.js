import axios from 'axios'
import { FETCH_USER } from './types'

export const fetchUser = () => {
    return function(dispatch) {
    axios
        .get('/api/currentuser')
        .then(res => dispatch({ type: FETCH_USER, payload: res})) //only dispatch the response once we have the action
    }
}