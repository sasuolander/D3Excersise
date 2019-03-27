import SearchBar from "./../../SearchBar"


const SearchIndexByCountry = (array, country) => {
    const names = array.map((data) => data.name.toLowerCase());
    return names.findIndex(name => name === country.toLowerCase());
};
const onChange = (e) => {
    e.preventDefault()
};
const handleChangeState = (e, downShiftState) => {
    this.setState({
        inputValue: downShiftState.inputValue
    })
};
const onSubmit = (e) => {
    e.preventDefault()
    const {inputValue} = this.state,
        indexValueOfCountry = this.SearchIndexByCountry(this.props.data, inputValue);
    try {
        this.setState(
            {indexValue: indexValueOfCountry}
        )
        //this.forceUpdate()
    } catch (error) {
        console.log('errro', error)
    }
};