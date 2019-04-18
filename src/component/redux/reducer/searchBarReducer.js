import {updateIndex,updateInput} from './../action/types'

const initialState={
    inputValue: '',
    indexValue: -1,
};

export default  (state=initialState,action)=>{
    switch (action.type) {
        case updateIndex:
            return{
                ...state,
                indexValue:action.payload
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
