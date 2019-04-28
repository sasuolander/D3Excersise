import React, { Component } from "react";
import SearchBarElement from "./component/elements/SearcBarElement";
import { Footer } from "./component/elements/Footer";
import { Header } from "./component/elements/Header";
import Grid from "@material-ui/core/Grid";
import DiagramElement from "./component/elements/DiagramElement";
import { getDataAction } from "./component/redux/action/dataAction";
import { connect } from "react-redux";


class App extends Component{
  constructor(props){
    super(props)
  }

  componentWillMount() {
    const { getData } = this.props;
   getData();
  }
  render(){
    return(
      <div className="classes.root">
        <Grid
          container
          justify="center"
          direction="column"
          alignItems="center"
          spacing={24}
        >
          <Header title="CO2 value" />
          <Grid item xs={12}>
            <DiagramElement/>
          </Grid>
          <SearchBarElement />
          <Footer text={"Sasu Ölander"} />
        </Grid>
      </div>)
  }
} 

const mapDispatchToProps = (dispatch, ownProps) => ({
  getData: () => dispatch(getDataAction())
})

export default connect(null,
  mapDispatchToProps
)(App);
