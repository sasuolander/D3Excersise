import { combineReducers } from 'redux'
import {XScale,YScale} from './d3State'
import {datas} from './init'

export default combineReducers({
    datas,
    XScale,YScale
})