import React, { Component } from "react";
import { select } from "d3-selection";

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
    select(node.current).call(this.props.call);
  }

  render() {
    const { x, y } = this.props;
    return <g ref={this.GAxis} transform={`translate(${x}, ${y})`} />;
  }
}
