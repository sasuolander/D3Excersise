import {updateIndex} from './types'

export const updateIndexAction =(index)=>dispatch=>{
    dispatch({
        type:updateIndex,
        payload:index
    })
};

