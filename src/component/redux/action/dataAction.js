import Axios from "axios";
import {API_URL} from './../constant'
import {getData} from "./types";
import {GeneralArray} from "./dataFunction";

export const getdata = ()=>dispatch=>{
    console.log("start getData");
    try{
        Axios.get(API_URL).then(res => {
            const array=GeneralArray(res.data);
            dispatch(
                {
                    type:getData,

                    payload:array
                }
            );
            console.log('data',array);
        }).catch(err => {
            return console.log(err)
        });
    }catch (e) {
        console.log('error',e)
    }
    console.log("ending getData");
};

