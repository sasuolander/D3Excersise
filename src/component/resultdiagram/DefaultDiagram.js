import React, {Component} from 'react'
import "./../../styles/App.scss"
import {scaleLinear, scaleTime} from 'd3-scale'
import {axisBottom, axisLeft} from "d3-axis";
import {select} from "d3-selection";
import {line} from "d3-shape";
import {max, extent} from "d3-array";
import {format} from "d3-format";
import PropTypes from 'prop-types';
//https://embed.plnkr.co/plunk/WjmCzZ
export default class DefaultDiagram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //standard d3 marginals and dimensions
            margin: {top: 30, right: 20, bottom: 110, left: 50},
            width: 960,
            height: 500,
            isLoaded:0
        }
    }

    componentDidMount() {
        this.createBarChart(this.props.data)
    }

    componentDidUpdate() {
        this.createBarChart(this.props.data)
    }

    createArrayForD3 = (data) => {
        let inputData = data.measurement;
        let array = [];
        inputData.forEach((obj) => {
            array.push({
                year: obj[0],
                value: obj[1]
            })
        });
        return array
    };

    createBarChart = (data) => {
        //stop drawing if data is undefined,componenDidUpdate
        // is going to try render it again when data is defined
        if (data === undefined) {
            return "error"
        }
        let array = this.createArrayForD3(data);
        const size = array.length;
        const {margin, height, width} = this.state;
        const widthUsed = width - margin.left - margin.right,
            heightUsed = height - margin.top - margin.bottom;
        //node represent svg element
        const node = this.node;
        const MasterElement = select(node).append('g')
            .attr('transform', 'translate('
                + margin.left + ' ' + margin.right + ')');

        const xScale = scaleTime().rangeRound([0, widthUsed]),
            yScale = scaleLinear().rangeRound([heightUsed, 0]),
            xAxis = axisBottom(xScale).ticks(size / 2).tickFormat(format("d")),
            yAxis = axisLeft(yScale);

        const valueline = line().x((d) => {
                return xScale(d.year)
            }
        ).y((d) => {
            return yScale(d.value)
        });

        xScale.domain(extent(array, (d) => {
            //console.log("XScale "+d.year)
            return d.year
        }));
        yScale.domain([0, max(array, (d) => {
            //console.log("YScale "+d.value)
            return d.value
        })]);

        MasterElement.append('path').datum(array)
            .attr("class", "line")
            .attr("d", valueline);

        MasterElement.append("g").attr("class", "axis--x")
            .attr("transform", "translate(0," + heightUsed + ")")
            .call(xAxis);
        MasterElement.append("g")
            .attr("class", "axis--y")
            .attr("transform", "translate(0," + 0 + ")")
            //.attr("transform", "rotate("+0+")")
            //.attr('opacity',"1")
            .call(yAxis);
    };

    render() {
        //const {margin, height, width} = this.state;
        const {height, width} = this.props;
        return (
            <svg width={width}
                 height={height}
                //viewBox={"0 0 0 0"}
                //transform={translate}
                 ref={node => this.node = node}>
            </svg>
        );
    }
}
DefaultDiagram.PropsTypes = {
    data: PropTypes.array
};