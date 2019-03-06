//import {chooseCountry} from './../action/dataAction'
///const initialState
export const data=(state =[],action)=>{
    switch (action.type) {
        case 'chooseCountry':
            return[
                action.country
        ]
        default:
            return[
                "array is empty"
            ]


        
    }
}