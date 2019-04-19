import React, {Component} from 'react'
import SearchBarElement from './component/elements/SearcBarElement'
import {Footer} from './component/elements/Footer'
import {Header} from './component/elements/Header'
import Grid from '@material-ui/core/Grid';
import CO2Diagram from './component/resultdiagram/CO2Diagram'
import {getDataAction} from "./component/redux/action/dataAction"
import connect from "react-redux/es/connect/connect";
import { updateInputAction } from './component/redux/action/searchBarAction';
import { updateIndexAction } from './component/redux/action/searchBarAction';
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
        const {getDataAction}=this.props;
        getDataAction();
    }
    
    createArrayForD3 = (data) => {
        if (data === undefined) {
            return 'error'
        }
        let inputData = data.measurement,
         array = [];
        inputData.forEach((obj) => {
            array.push({
                year: obj[0],
                value: obj[1]!==''?parseInt(obj[1]):'0',
            })
        });
        return array
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
                      spacing={24}>
                    <Header title='CO2 value'/>
                    <Grid item xs={12}>
                        {diagram}
                    </Grid>
                    <SearchBarElement />
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