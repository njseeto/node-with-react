import axios from 'axios'
import FETCH_USER from './types'

const fetchUser = () => {
    return function() {
    axios
        .get('/api/currentuser')
        .then(res => dispatch({ type: FETCH_USER, payload: res})) //only dispatch the response once we have the action
    }
}