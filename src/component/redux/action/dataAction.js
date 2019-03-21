import Axios from "axios";
import {csvParse} from "d3-dsv";
import {API_URL} from './../constant'
import {getData} from "./types";


export const getdata = ()=>dispatch=>{
    console.log("start getData");

    dispatch(
        {
            type:getData,
            payload:["test","test"]
        }
    );
    console.log("ending getData");
};

