
import React, {Component} from 'react';
import {select} from "d3-selection";
import {line} from "d3-shape";

export default class Path extends  Component{
    constructor(props){
        super(props);
        this.Path=React.createRef();
    }

    componentDidUpdate() {
        this.d3Render();
    }

    componentDidMount() {
        this.d3Render();
    }

    d3Render() {

        const {xScale,yScale,data } = this.props;
        const node = this.Path;
        const valueline = line().x((d) => {
            return xScale(d.year)}
        ).y((d) => {
            return yScale(d.value)});
        select(node.current).datum(data)
            .attr("class", "line")
            .attr("d", valueline);
    }

    render(){
        return(
            <path ref={this.Path}>
            </path>
        );
    }
}
