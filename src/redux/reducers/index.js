import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import graphic from './graphic';

export default combineReducers({
    routing: routerReducer,
    graphic,
})
