import Axios from "axios";
import {csvParse} from "d3-dsv";
import {API_URL} from './../constant'
export const chooseCountry = (country)=>{
    return {type:'ChooseCountry', country}
};


export const AskData=(payload)=>{
    return {type:'askData',payload}
};
export const GetData=(request)=>{
    return {type:'getData',request}
};



const loadDataMethod = (url) => {
    //console.log("loadData() function load");
    Axios.get(url).then(res => {
        //console.log(res.data)
            return res.data
    }).catch(err => {
        return console.log(err)
    });
};

const SearchIndexByCountry = (array, country) => {
    const names = array.map((data) => data.name.toLowerCase());
    return names.findIndex(name => name === country.toLowerCase());
};

const createGeneralArray = (dataRes) => {
    const array = csvParse(dataRes, (data) => {
        return {
            name: data.CountryName,
            countryCode: data.CountryCode,
            indicator: data.IndicatorName,
            indicatorCode: data.IndicatorCode,
            measurement: Object.keys(data) //Converting series of object into array and then removing duplicate data
                .map((key) => {
                    return [String(key), data[key]]
                }).slice(0, 55)
        }
    });
    return array
};

const createArrayForD3 = (data) => {
    if (data === undefined) {
        return 'error'
    }
    let inputData = data.measurement;
    //console.log(data)
    let array = [];
    inputData.forEach((obj) => {
        array.push({
            year: obj[0],
            value: obj[1],
        })
    });
    return array
};