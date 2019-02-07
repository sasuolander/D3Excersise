import React, {Component} from 'react'
import "./../../styles/App.scss"
import {
    XYPlot,LineSeries,
    VerticalGridLines,HorizontalGridLines,
    YAxis,XAxis
} from 'react-vis';


 class DefaultDiagram extends Component {
    render (
    ){

        const data = [
            {x: 0, y: 8},
            {x: 1, y: 5},
            {x: 2, y: 4},
            {x: 3, y: 9},
            {x: 4, y: 1},
            {x: 5, y: 7},
            {x: 6, y: 6},
            {x: 7, y: 3},
            {x: 8, y: 2},
            {x: 9, y: 0}
          ];
        return(
            // <div className = "test_box ">
            <div className = " ">

            
                        <p>{this.props.test}</p>


                        <XYPlot height={300} width={300}>
          <LineSeries data={data}  />
          <VerticalGridLines />
  <HorizontalGridLines />
  <XAxis />
  <YAxis />
        </XYPlot>

                        
                    </div>
        );
    }
}

export default DefaultDiagram