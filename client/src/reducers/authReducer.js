import { FETCH_USER } from '../actions/types'
import { userInfo } from 'os';

export default function (state = null, action) {
    console.log('reducer action: ', action)
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false
        default:
            return state
    }
}