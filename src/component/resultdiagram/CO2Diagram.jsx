import React, {PureComponent} from 'react'
import "./../../styles/App.scss"
import {scaleLinear, scaleTime} from 'd3-scale'
import {axisBottom, axisLeft} from "d3-axis";
import {select} from "d3-selection";
import {max, extent} from "d3-array";
import {format} from "d3-format";
import PropTypes from 'prop-types';
import Path from './Path';
import Axis from "./Axis";
import Label from "./Label";
import {minvalue, maxvalue} from "./../redux/action/dataFunction"


export default class CO2Diagram extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            xScale: scaleTime()
                .range([0, this.props.widthUsed])
                .domain(extent(this.props.data, (d) => {
                    return d.year
                })),
            yScale: scaleLinear()
                .range([this.props.heightUsed, 0])
               .domain([minvalue(this.props.data), max(this.props.data, (d) => {
                    return d.value
                })])
        };
        this.GMargin = React.createRef();
    }
//minvalue()



    static getDerivedStateFromProps(nextProps, State) {
        const {xScale, yScale} = State;
        xScale.domain(extent(nextProps.data, (d) => {
            return d.year
        }));
        yScale
            .domain([minvalue(nextProps.data), max(nextProps.data, (d) => {
            return d.value})]);
        State = {...State, xScale, yScale};
        return State;
    }

    render() {

        const {xScale, yScale} = this.state,
            {margin, heightUsed, widthUsed, data, height, width, } = this.props,
            xAxis = axisBottom(xScale)
            .ticks(data.length / 2)
                .tickFormat(format("d")),
            yAxis = axisLeft(yScale)
        select(this.GMargin.current)
            .attr('transform', 'translate('
                + margin.left + ' ' + margin.right + ')')
        return (
            <svg width={width}
                 height={height}
            >
                <g ref={this.GMargin}>
                    <Axis x={0} y={0} scale={yScale}
                          call={yAxis}
                          type="Left"/>
                    <Axis x={0} y={heightUsed} scale={xScale}
                          call={xAxis}
                          type="Bottom"
                    />
                    <Path
                        xScale={xScale}
                        yScale={yScale}
                        data={data}
                    />
                    <Label
                        position={"x"}
                        width={widthUsed}
                        height={heightUsed}
                        margin={margin}
                        labelX={"Years"}
                    />
                    <Label
                        position={"y"}
                        width={widthUsed}
                        height={heightUsed}
                        margin={margin}
                        labelY={"C02 value"}/>
                </g>
            </svg>
        );
    }
}
CO2Diagram.PropsTypes = {
    data: PropTypes.array.isRequired
};