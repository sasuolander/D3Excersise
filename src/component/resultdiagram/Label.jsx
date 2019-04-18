import React, {Component} from 'react'
import {select} from 'd3-selection'

export default class Label extends Component {
    constructor(props) {
        super(props);
        this.labelRef = React.createRef()
    }

    componentDidUpdate() {
        this.d3Render();
    }

    componentDidMount() {
        this.d3Render();
    }

    d3Render = () => {
        const {position, width, height, margin, labelX, labelY} = this.props;
        switch (position) {
            case "x":
                select(this.labelRef.current).attr("transform",
                    "translate(" + (width / 2) + " ," +
                    (height + margin.top + 20) + ")")
                    .style("text-anchor", "middle")
                    .text(labelX);
                break;
            case "y":
                select(this.labelRef.current)
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0 - margin.left)
                    .attr("x", 0 - (height / 2))
                    .attr("dy", "1em")
                    .style("text-anchor", "middle")
                    .text(labelY);
                break;
            default: 
        }
    };

    render() {
        return (
            <text ref={this.labelRef}>
            </text>
        )
    }
}