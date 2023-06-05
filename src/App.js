import "./App.css";
import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  // Routes,
  Switch,
  Route,
  // Link
} from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chk: 'Enable',
      mode: 'light',
    };
  }
  toggleDarkMode = () => {
    // this.setState((prevState) => ({
    //   chk: !prevState.chk,
    //   mode:'dark'
    // }));
    if(this.state.mode==='light'){
      this.setState({
        chk: 'Disable',
        mode: 'dark',
      });
     document.body.style.backgroundColor = '#163639';
    }
    else{
      this.setState({
        chk: 'Enable',
        mode: 'light',
      });
      document.body.style.backgroundColor = 'white';
      }
      
    // alert("Dark Mode");
  };
  state = {
    progress:0
  }
  setProgress = (progress)=>{
    this.setState({
      progress:progress
    })
  }
  apiKey= process.env.REACT_APP_NEWS_API
  render() {
    // const { chk } = this.state.chk;
    // const { mode } = this.state.mode;
    return (
      <>
        {/* <div>Class Based Component</div> */}
        {/* <News setProgress = {this.setProgress} apiKey = {this.apiKey} category='sport' country = 'us'/> */}
        <Router basename={process.env.PUBLIC_URL}>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Navbar chk={this.state.chk} toggleDarkMode={this.toggleDarkMode} mode={this.state.mode} />
          <Switch>
            <Route exact path="/">
              {" "}
              <News setProgress = {this.setProgress} apiKey = {this.apiKey} key="general" category="general" chk={this.state.chk} toggleDarkMode={this.toggleDarkMode} mode={this.state.mode} />{" "}
            </Route>
            <Route exact path="/Business">
              {" "}
              <News setProgress = {this.setProgress} apiKey = {this.apiKey} key="business" category="business" chk={this.state.chk} toggleDarkMode={this.toggleDarkMode} mode={this.state.mode} />{" "}
            </Route>
            <Route exact path="/Entertainment">
              {" "}
              <News setProgress = {this.setProgress} apiKey = {this.apiKey} key="entertainment" category="entertainment" chk={this.state.chk} toggleDarkMode={this.toggleDarkMode} mode={this.state.mode} />{" "}
            </Route>
            <Route exact path="/Health">
              {" "}
              <News setProgress = {this.setProgress} apiKey = {this.apiKey} key="health" category="health" chk={this.state.chk} toggleDarkMode={this.toggleDarkMode} mode={this.state.mode} />{" "}
            </Route>
            <Route exact path="/Science">
              {" "}
              <News setProgress = {this.setProgress} apiKey = {this.apiKey} key="science" category="science" chk={this.state.chk} toggleDarkMode={this.toggleDarkMode} mode={this.state.mode} />{" "}
            </Route>
            <Route exact path="/Sports">
              {" "}
              <News setProgress = {this.setProgress} apiKey = {this.apiKey} key="sport" category="sport" chk={this.state.chk} toggleDarkMode={this.toggleDarkMode} mode={this.state.mode} />{" "}
            </Route>
            <Route exact path="/Technology">
              {" "}
              <News setProgress = {this.setProgress} apiKey = {this.apiKey} key="technology" category="technology" chk={this.state.chk} toggleDarkMode={this.toggleDarkMode} mode={this.state.mode} />{" "}
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}
