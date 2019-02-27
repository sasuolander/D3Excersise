import React, {Component} from 'react'
import {SearchBar} from './component/SearchBar'
//import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid';
import DefaultDiagram from './component/resultdiagram/DefaultDiagram'
import Axios from 'axios';
import {Footer} from './component/elements/Footer'
import {Header} from './component/elements/Header'
import {csvParse} from "d3-dsv";
//import {format} from 'd3-format'
//import DefaultDiagramTest2 from "./component/resultdiagram/DefaultDiagramTest2";
//global namespace
const API_URL = "https://gist.githubusercontent.com/sasuolander/54feb87d8a2ecf03e32e5e03d61aaf2a/raw/30ee2a2e22dbeac645ae55b0df7aa2bdd59307c7/data.csv";
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            inputValue: '',
            indexValue: -1,
            initialIndexValue: 1,
            //standard d3 marginals and dimensions
            margin: {top: 20, right: 0, bottom: 10, left: 70},
            widthMargin: 960,
            heightMargin: 500,
        };
    }

    componentDidUpdate() {
    }

    componentDidMount() {

    }

    componentWillMount() {
        this.loadData()
    }

    loadData = () => {
        //console.log("loadData() function load");
        Axios.get(API_URL).then(res => {
            //console.log(res.data)
            const dataRes = res.data;
            this.setState({
                data: this.createGeneralArray(dataRes)
            })
        }).catch(err => {
            return console.log(err)
        });
    };

    SearchIndexByCountry = (array, country) => {
        const names = array.map((data) => data.name.toLowerCase());
        return names.findIndex(name => name === country.toLowerCase());
    };

    createGeneralArray = (dataRes) => {
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

    createArrayForD3 = (data) => {
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

    //https://codeburst.io/javascript-finding-minimum-and-maximum-
    // values-in-an-array-of-objects-329c5c7e22a2
    getMinY = (data) => {
        try {
            return data.reduce((max, p) => p.value > max ? p.value : max, data[0].value);

        } catch (e) {
            console.log('error', data)
            console.log(e)
        }
    }
    getMaxY = (data) => {
        try {
            return data.reduce((min, p) => p.value < min ? p.value : min, data[0].value);
        } catch (e) {
            console.log(e)
        }
    }
    onChange = (e) => {
        e.preventDefault()
    };
    handleChangeState = (e, downShiftState) => {
        this.setState({
            inputValue: downShiftState.inputValue
        })
    };

    onSubmit = (e) => {
        e.preventDefault()
        const {data, inputValue} = this.state,
            indexValueOfCountry = this.SearchIndexByCountry(data, inputValue)
        try {
            this.setState(
                {indexValue: indexValueOfCountry}
            )
            //this.forceUpdate()
        } catch (error) {
            console.log('errro', error)
        }
    };

    render() {
        const {data, indexValue, initialIndexValue, widthMargin, heightMargin, margin} = this.state,
            MarginW = widthMargin - margin.left - margin.right,
            MarginH = heightMargin - margin.top - margin.bottom,
            MarginWNegate = widthMargin + margin.left + margin.right,
            MarginHNegate = heightMargin + margin.top + margin.bottom;
        let array = indexValue <= -1 ? this.createArrayForD3(data[initialIndexValue]) :
            this.createArrayForD3(data[indexValue])

        /*console.log(array);
        console.log('ymin', this.getMinY(array))
        console.log('ymax', this.getMaxY(array))*/
        const diagram = indexValue <= -1 ?
            <DefaultDiagram data={this.createArrayForD3(data[initialIndexValue])}
                            width={MarginWNegate}
                            height={MarginHNegate}
                            margin={margin}
                            heightUsed={MarginH}
                            widthUsed={MarginW}
                            Ymin={this.getMinY(array)}
                            Ymax={this.getMaxY(array)}
            /> :
            <DefaultDiagram data={this.createArrayForD3(data[indexValue])}
                            width={MarginWNegate}
                            height={MarginHNegate}
                            margin={margin}
                            heightUsed={MarginH}
                            widthUsed={MarginW}
                            Ymin={this.getMinY(array)}
                            Ymax={this.getMaxY(array)}
            />;
        return (
            <div className="classes.root">
                <Grid container justify='center'
                      direction='column'
                      alignItems='center'
                      spacing='24'>
                    <Header title='CO2 value'/>
                    <Grid item xs='12'>
                        {diagram}
                    </Grid>
                    <SearchBar data={data}
                               onChange={this.onChange}
                               onStateChange={this.handleChangeState}
                               placeholder="Write name of country"
                               onSubmit={this.onSubmit}
                               itemToStrong={this.itemToString}/>
                    <Footer text={'Sasu Ölander'}/>
                </Grid>
            </div>
        );
    }
}