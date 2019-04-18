import React, {Component} from 'react'
//import {SearchBar} from './component/SearchBar'
import SearchBar from './component/SearchBar'
//import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid';
import CO2Diagram from './component/resultdiagram/CO2Diagram'
import Axios from 'axios';
import {Footer} from './component/elements/Footer'
import {Header} from './component/elements/Header'
import {csvParse} from "d3-dsv";
import {getDataAction} from "./component/redux/action/dataAction"
import connect from "react-redux/es/connect/connect";
import { updateInputAction } from './component/redux/action/searchBarAction';
import { updateIndexAction } from './component/redux/action/searchBarAction';
//import {format} from 'd3-format'
//import DefaultDiagramTest2 from "./component/resultdiagram/DefaultDiagramTest2";
//global namespace
const API_URL = "https://gist.githubusercontent.com/sasuolander/54feb87d8a2ecf03e32e5e03d61aaf2a/raw/30ee2a2e22dbeac645ae55b0df7aa2bdd59307c7/data.csv";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialIndexValue: 1,
            //standard d3 marginals and dimensions
            margin: {top: 20, right: 0, bottom: 10, left: 70},
            widthMargin: 960,
            heightMargin: 500,
        };
    }
    componentWillMount() {
        this.props.getDataAction();
    }
    
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

    SearchIndexByCountry = (array, country) => {
        const names = array.map((data) => data.name.toLowerCase());
        return names.findIndex(name => name === country.toLowerCase());
    };
    handleChangeState = (e, downShiftState) => {
        const {updateInputAction} = this.props;
        updateInputAction(downShiftState.inputValue)
    };
    onSubmit = (e) => {
        e.preventDefault()
        const {inputValue} = this.props,
            indexValueOfCountry = this.SearchIndexByCountry(this.props.data, inputValue)
        try {
            const {updateIndexAction}= this.props;
            updateIndexAction(indexValueOfCountry)
        } catch (error) {
            console.log('errro', error)
        }
    };

    render() {
        const { initialIndexValue, widthMargin, heightMargin, margin} = this.state,
            MarginW = widthMargin - margin.left - margin.right,
            MarginH = heightMargin - margin.top - margin.bottom,
            MarginWNegate = widthMargin + margin.left + margin.right,
            MarginHNegate = heightMargin + margin.top + margin.bottom;
            const {data,indexValue} = this.props;
        const diagram = indexValue <= -1 ?
            <CO2Diagram
                            data={this.createArrayForD3(data[initialIndexValue])}
                            indexValue={initialIndexValue}
                            width={MarginWNegate}
                            height={MarginHNegate}
                            margin={margin}
                            heightUsed={MarginH}
                            widthUsed={MarginW}
            /> :
            <CO2Diagram     data={this.createArrayForD3(data[indexValue])}
                            indexValue={indexValue}
                            width={MarginWNegate}
                            height={MarginHNegate}
                            margin={margin}
                            heightUsed={MarginH}
                            widthUsed={MarginW}
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
                    <SearchBar
                               //onChange={this.onChange}
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

const mapStateToProps = state => ({
    data :state.data.CO2DataSet,
    inputValue:state.searchBar.inputValue,
    indexValue:state.searchBar.indexValue
});
export default connect(mapStateToProps,{getDataAction,updateInputAction,updateIndexAction})(App)