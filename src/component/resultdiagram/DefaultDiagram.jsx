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
export default class DefaultDiagram extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            xScale: scaleTime()
                .rangeRound([0, this.props.widthUsed]).
            domain(extent(this.props.data, (d) => {
                return d.year
            })),
            yScale: scaleLinear()
                .rangeRound([this.props.heightUsed, 0]).
            domain([0, max( this.props.data, (d) => {
                return d.value
            })]),
        };
        this.GMargin = React.createRef();
    }

    static getDerivedStateFromProps(Props, State) {
        let {xScale, yScale} = State;
        //console.log(nextProps.data)
        xScale.domain(extent(Props.data, (d) => {
            return d.year
        }));
        yScale.domain([0, max(Props.data, (d) => {
            return d.value
        })]);
        State = {...State, xScale, yScale};
        return State;
    }

    render() {

        const {xScale, yScale} = this.state,
            {margin, heightUsed, data, height, width} = this.props;
        select(this.GMargin.current)
            .attr('transform', 'translate('
                + margin.left + ' ' + margin.right + ')');
        const xAxis = axisBottom(xScale).ticks(data.length / 2).tickFormat(format("d"));
        const yAxis = axisLeft(yScale);
        return (
            <svg width={width}
                 height={height}
                //viewBox={"0 0 0 0"}
                //transform={translate}
                 ref={node => this.node = node}>
                <g ref={this.GMargin}>
                    <Axis x={0} y={0} scale={yScale}
                          call={yAxis}
                          type="Left"/>
                    <Axis x={0} y={heightUsed} scale={xScale}
                          call={xAxis}
                          type="Bottom"/>
                    <Path
                        xScale={xScale}
                        yScale={yScale}
                        data={data}
                    />
                </g>
            </svg>
        );
    }
}
DefaultDiagram.PropsTypes = {
    data: PropTypes.array
};