import React, {Component} from 'react'
import "./../../styles/App.scss"
import {scaleLinear, scaleTime} from 'd3-scale'
import {axisBottom,axisLeft,axisRight,axisTop} from "d3-axis";
import {select,selectAll} from "d3-selection";
import {line} from "d3-shape";

class DefaultDiagram extends Component {
constructor(props){
    super(props);
    this.state={


            //margin : [{top: 20}, {right: 20}, {bottom: 110}, {left:100 }],
            width :500,
            height : 500,


        dataTest:[{x: 0, y: 8},
            {x: 1, y: 5},
            {x: 2, y: 4},
            {x: 3, y: 9},
            {x: 4, y: 1},
            {x: 5, y: 7},
            {x: 6, y: 6},
            {x: 7, y: 3},
            {x: 8, y: 2},
            {x: 9, y: 0}],
};

}
    componentDidMount() {
this.createBarChart()

    }
     componentDidUpdate() {
         this.createBarChart()

     }

    createBarChart=()=>{

    const   xScale=scaleTime().rangeRound([0,this.state.width]),
            yScale=scaleLinear().rangeRound(this.state.height)
        //.domain([yLimits.min, yLimits.max])
            .rangeRound([this.state.height, 0]),
            xAxis = axisBottom(xScale),
            yAxis = axisLeft(yScale),
            valueline= line().x(
                (d)=>{return d}
            ).y((d)=>{return d}),
        //node represent svg element
            node = this.node;
        //     csv(this.props.data).then(function (data) {
        //         console.log(data)
        //
        //     }).catch((err)=>{
        //         console.log(err)
        // });


        select(node).append("g").attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.state.height + ")")
            .call(xAxis);
        select(node).append("g")
            .attr("class", "axis axis--y")
            .call(yAxis);

        // select(node).selectAll('line').data(this.props.data).enter()
};




     render (
    ){


        return(
            // <div className = "test_box ">
            <div className = " ">
            
                        <p>{this.props.test}</p>
                            <svg width={this.state.width+40}
                                 height={this.state.height+40}
                                 ref={node =>this.node = node}
                            ></svg>

                        
                    </div>
        );
    }
}

export default DefaultDiagram