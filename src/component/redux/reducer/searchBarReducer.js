import {updateIndex,updateInput} from './../action/types'

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
        case updateInput:
            return{
                ...state,
                inputValue: action.payload
            }
        default:
            return state
    }
}
