import React, {Component} from 'react'
import {SearchBar} from './component/SearchBar'
//import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid';
import DefaultDiagram from './component/resultdiagram/DefaultDiagram'
import Axios from 'axios';
import {Footer} from './component/elements/Footer'
import {Header} from './component/elements/Header'
import {csvParse} from "d3-dsv";
//import DefaultDiagramTest2 from "./component/resultdiagram/DefaultDiagramTest2";
//global namespace
const API_URL = "https://gist.githubusercontent.com/sasuolander/54feb87d8a2ecf03e32e5e03d61aaf2a/raw/30ee2a2e22dbeac645ae55b0df7aa2bdd59307c7/data.csv";
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: [],
            filtered: [],
            inputValue: '',
            indexValue: -1,
            initialIndexValue: 1,
            //standard d3 marginals and dimensions
            margin: {top: 20, right: 0, bottom: 0, left: 50},
            widthMargin: 960,
            heightMargin: 500,
        });
    }

    componentDidUpdate() {
    }

    componentDidMount() {

    }

    componentWillMount() {
        this.loadData()
    }

    loadData = () => {
        console.log("loadData() function load");
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
                    }).slice(0, 55  )
            }
        });
        return array
    };

    createArrayForD3 = (data) => {
        if (data == undefined) {
            return 'error'
        }
        let inputData = data.measurement;
        //console.log(data)
        let array = [];
        inputData.forEach((obj) => {
            array.push({
                year: obj[0],
                value: obj[1]
            })
        });
        return array
    };

    onChange = (e) => {
        e.preventDefault()
        //console.log("capture change");
    };
    handleChangeState = (e, downShiftState) => {
        //e.preventDefault()
        //console.log("capture change", e);
        //console.log(downShiftState.inputValue);
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

        const diagram = indexValue <= -1 ?
            <DefaultDiagram test="test" data={this.createArrayForD3(data[initialIndexValue])}
                            width={MarginWNegate}
                            height={MarginHNegate}
                            margin={margin}
                            heightUsed={MarginH}
                            widthUsed={MarginW}
            />
            :
            <DefaultDiagram test="test" data={this.createArrayForD3(data[indexValue])}
                            width={MarginWNegate}
                            height={MarginHNegate}
                            margin={margin}
                            heightUsed={MarginH}
                            widthUsed={MarginW}
            />
        return (
            <div className="classes.root">
                <Grid container justify='center'
                      direction='column'
                      alignItems='center'
                      spacing='24'
                >
                    <Header title='CO value'/>
                    <Grid item xs='12'>
                        {diagram}
                    </Grid>
                    <SearchBar data={data}
                               onChange={this.onChange}
                               onStateChange={this.handleChangeState}
                               placeholder="test"

                        //inputValue={inputValue}
                               onSubmit={this.onSubmit}
                               itemToStrong={this.itemToString}
                    />
                    <button onClick={this.loadData}>loadData</button>
                    <button onClick={() => console.log(data[initialIndexValue].name)}>Test data state</button>
                    <button onClick={() => console.log(data[indexValue].name,data[indexValue].measurement)}>Test data state now</button>
                    <button onClick={() => console.log(this.SearchIndexByCountry(data, 'afghanistan'))}>Test function
                    </button>
                    <Footer/>
                </Grid>
            </div>
        );
    }
}