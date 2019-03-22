import Axios from "axios";
import {csvParse} from "d3-dsv";
import {API_URL} from './../constant'




/*export const DataMethod = (url) => {
    console.log("DataMethod() function load",url);
    //console.log("loadData() function load");
    Axios.get(url).then(res => {
        console.log('response header',res.data);
        return res.data
    }).catch(err => {
        return console.log(err)
    });
};*/



export const GeneralArray = (dataRes) => {
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
    //console.log(array)
    return array
};

export const SearchIndexByCountry = (array, country) => {
    const names = array.map((data) => data.name.toLowerCase());
    return names.findIndex(name => name === country.toLowerCase());
};

export const createArrayForD3 = (data) => {
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