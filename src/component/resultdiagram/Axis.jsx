import React, {Component} from 'react';
import {select} from "d3-selection";
import {Path} from "./Path";
import styled from "styled-components";

const Text = styled.text`
    fill: black;
    font-family: sans-serif;
    font-size: 10px;`;
export default class Axis extends Component {
    constructor(props) {
        super(props);
        this.GAxis = React.createRef();
    }

    componentDidUpdate() {
        this.d3Render();
    }

    componentDidMount() {
        this.d3Render();
    }

    d3Render() {
        const node = this.GAxis;
        select(node.current)
        //.attr("class", "axis--x")
            .call(this.props.call);
        //.call([`axis${type}`](this.props.scale));
    }
    a;
    get labelPos() {
        const {type, scale} = this.props;
        switch (type) {
            case "Top":
                return {x: scale.range()[1] + 20, y: 0};
            case "Right":
                return {x: 20, y: 0};
            case "Bottom":
                return {x: scale.range()[1] + 25, y: 25};
            case "Left":
                return {x: -25, y: 0};
        }
    }
    render() {

        const {x, y, label} = this.props;
        return (
            <g ref={this.GAxis}
               transform={`translate(${x}, ${y})`}>
                <Text {...this.labelPos}>{label}</Text>
            </g>
        );
    }

}
