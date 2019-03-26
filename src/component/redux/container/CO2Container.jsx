import connect from "react-redux/es/connect/connect";

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

const getMeasurementOfCountry=(state,index)=>createArrayForD3(state.data.CO2DataSet[index])


const mapStateToProps = state => ({
    measurement :getMeasurementOfCountry(state,state.index)
});


export default connect(mapStateToProps)(CO2Diagram)