import {updateIndex} from './../action/types'

const initialState={
    index:'',
    inputValue: '',
};

export default  (state=initialState,action)=>{
    switch (action.type) {
        case updateIndex:
            return{
                ...state,
                index:action.payload
            };
        default:
            return state
    }
}
