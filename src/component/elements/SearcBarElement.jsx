import React, { Component } from 'react';
import SearchBar from './../SearchBar'
import connect from "react-redux/es/connect/connect";
import { updateInputAction } from './../redux/action/searchBarAction';
import { updateIndexAction } from './../redux/action/searchBarAction';

class SearchBarElement extends Component{
    constructor(props){super(props)}

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
        const {inputValue,data} = this.props,
            indexValueOfCountry = this.SearchIndexByCountry(data, inputValue)
        try {
            const {updateIndexAction}= this.props;
            updateIndexAction(indexValueOfCountry)
        } catch (error) {
            console.log('Failed to update state', error)
        }
    };

    render(){
        return(
<SearchBar
                               onStateChange={this.handleChangeState}
                               placeholder="Write the name of country"
                               onSubmit={this.onSubmit}
                                itemToStrong={this.itemToString}

                               />
        )
    }
}

const mapStateToProps = state => ({
    data :state.data.CO2DataSet,
    inputValue:state.searchBar.inputValue,
    indexValue:state.searchBar.indexValue
});

export default connect(mapStateToProps,{updateInputAction,updateIndexAction})(SearchBarElement)