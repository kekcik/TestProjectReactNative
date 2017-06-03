import {createStore} from 'redux'
import getMoviesFromApi from './api-manager.js'

function playlist(state = [], action) {
    if (action.type === 'musicVideo') {
        return [
            ...state,
            action.payload
        ]
    }
    if (action.type === 'clear') {
        return []
    }
    return state
}

export default store = createStore(playlist);

getMoviesFromApi("Muse")
