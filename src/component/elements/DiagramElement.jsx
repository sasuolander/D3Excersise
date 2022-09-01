import React, { Component } from "react";
import CO2Diagram from "./../resultdiagram/CO2Diagram";
import { getDataAction } from "./../redux/action/dataAction";
import connect from "react-redux/es/connect/connect";
import {Loading} from "./Loading"

class DiagramElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
          initialIndexValue: 1,
          //standard d3 marginals and dimensions
          margin: { top: 20, right: 0, bottom: 10, left: 70 },
          widthMargin: 960,
          heightMargin: 500,
          loaded: false
        };
      }
      
      renderDiagram(){
        const { data, indexValue,completed,loading } = this.props,
              {  widthMargin, heightMargin, margin } = this.state,
              marginW = widthMargin - margin.left - margin.right,
              marginH = heightMargin - margin.top - margin.bottom,
              marginWNegate = widthMargin + margin.left + margin.right,
              marginHNegate = heightMargin + margin.top + margin.bottom;
        return  !loading&&completed&& data<=1?
        (<CO2Diagram
          data={data[indexValue].measurement}
          indexValue={indexValue}
          width={marginWNegate}
          height={marginHNegate}
          margin={margin}
          heightUsed={marginH}
          widthUsed={marginW}
        />):(null);

      }
      render(){
        const loadingSpinner = this.props.loading && <Loading/>;
          return(
              <React.Fragment>
              {loadingSpinner}
            { this.renderDiagram()}
              </React.Fragment>
          );
      }
}

const mapStateToProps = state => ({
    data: state.data.CO2DataSet,
    completed:state.data.completed,
    loading:state.data.loading,
    indexValue: state.searchBar.indexValue
  });

  const mapDispatchToProps = (dispatch, ownProps) => ({
          getData: () => dispatch(getDataAction())
  })
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DiagramElement);