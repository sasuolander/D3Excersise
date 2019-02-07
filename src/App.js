import React, { Component } from 'react'
import {SearchBar} from './component/SearchBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid';
import DefaultDiagram from './component/resultdiagram/DefaultDiagram'
import Axios from 'axios';
import {Footer} from './component/elements/Footer'
import {Header} from './component/elements/Header'
//global namespace
const API_URL ="https://gist.githubusercontent.com/sasuolander/54feb87d8a2ecf03e32e5e03d61aaf2a/raw/622dcf7f9758449a5230f4a042f582d8c65309a0/data.csv";
class App extends Component {
  constructor(props){
    super(props);
    this.state = ({
      dataCsv:[],
    });

    this.loadData=this.loadData.bind(this);
    //this.onClick=this.onClick.bind(this);
  }

  loadData(){
    console.log("loadData() function load")
    Axios.get(API_URL).then(res=>{
      console.log(res)
     this.setState({
      dataCsv:res.data
     })
    }).catch(err=>{
      return console.log(err)
    }
    );
  }

  
//handleClick(){}
//onClick(){}



  componentDidUpdate(){
  }
  componentDidMount(){

  }
  componentWillMount(){

  }
  render() {
    return (
      <div className="classes.root">
      <Grid container justify='center'
      direction='column'
      alignItems='center'
      spacing='24'
      >
      <Header viesti='header'/>
      <SearchBar input="testi"/>
      <Grid item xs='12'>
      <DefaultDiagram test="test" data="data"/>
      </Grid>
      <button onClick={this.loadData}>loadData</button>
      <Footer/>
      </Grid>
      </div>
    );
  }
}

export default App;
