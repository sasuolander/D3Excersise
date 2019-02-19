import React, {Component} from 'react'
import SearchBar from './component/SearchBar'
//import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid';
import DefaultDiagram from './component/resultdiagram/DefaultDiagram'
import Axios from 'axios';
import {Footer} from './component/elements/Footer'
import {Header} from './component/elements/Header'
import {csvParse} from "d3-dsv";
//global namespace
const API_URL = "https://gist.githubusercontent.com/sasuolander/54feb87d8a2ecf03e32e5e03d61aaf2a/raw/30ee2a2e22dbeac645ae55b0df7aa2bdd59307c7/data.csv";
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: [],
            filtered: [],
            testArray:   ['React Vienna', 'React Finland', 'Jest', 'Enzyme', 'Reactjs']
        });

        //when using arrow function, binding is not needed
        this.loadData = this.loadData.bind(this);
        //this.onClick=this.onClick.bind(this);
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
                    }).slice(0, 59)
            }
        });
        return array
    };

    handleChange(event) {
        console.log("input");
        console.log(event.target.value)
    };

//onClick=(event)=>{}
    componentDidUpdate() {
    }

    componentDidMount() {
        this.loadData()
    }

    componentWillMount() {
    }

    render() {

        //const diagram = this.state.data.filter(()=>{});
        return <div className="classes.root">
            <Grid container justify='center'
                  direction='column'
                  alignItems='center'
                  spacing='24'
            >
                <Header viesti='header'/>
                <Grid item xs='12'>
                    <DefaultDiagram test="test" data={this.state.data[1]}
                                    width={960}
                                    height={450}
                    />
                </Grid>
                <SearchBar items={this.state.testArray}
                           onChange={() => this.handleChange()}
                           placeholder={"test"}
                />
                <button onClick={this.loadData}>loadData</button>
                <button onClick={() => console.log(this.state.data[1].name)}>Test data state</button>
                <Footer/>
            </Grid>
        </div>;
    }
}