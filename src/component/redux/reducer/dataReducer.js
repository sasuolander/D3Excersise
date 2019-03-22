import {getData} from './../action/types'

const initialState={
    CO2DataSet:[]};
export default (state=initialState,action)=>{
    switch (action.type) {
        case 'getData':
            return{
                ...state,
                CO2DataSet:action.payload
            };
        default:
            return state
    }
}