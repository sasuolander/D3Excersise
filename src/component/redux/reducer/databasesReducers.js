import { combineReducers } from 'redux'
import {XScale,YScale} from './d3State'
import {data} from './data'

export default combineReducers({
    data,
    XScale,YScale
});
