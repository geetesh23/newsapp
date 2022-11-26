import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress:0
  }
  setProgress =  (progress)=>{
    this.setState({
      progress:progress
    })
  }
  
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
          <Routes>
            <Route exact path="/" element = {<News  key="general" setProgress={this.setProgress}  pageSize={6} country="in" category="general" Heading="Signews - Top Headlines" />}/>
            <Route exact path="/business" element = {<News  key="business" setProgress={this.setProgress} pageSize={6} country="in" category="business" Heading="Business News" />}/>
            <Route exact path="/entertainment" element = {<News   key="entertainment" setProgress={this.setProgress} pageSize={6} country="in" category="entertainment" Heading="Entertainment" />}/>
            <Route exact path="/general" element = {<News  key="general1" setProgress={this.setProgress} pageSize={6} country="in" category="general" Heading="General News" />}/>
            <Route exact path="/health" element = {<News  key="health" setProgress={this.setProgress} pageSize={6} country="in" category="health" Heading="Health" />}/>
            <Route exact path="/science" element = {<News  key="science" setProgress={this.setProgress} pageSize={6} country="in" category="science" Heading="Science" />}/>
            <Route exact path="/sports" element = {<News  key="sports" setProgress={this.setProgress} pageSize={6} country="in" category="sports" Heading="Sports" />}/>
            <Route exact path="/technology" element = {<News  key="technology" setProgress={this.setProgress} pageSize={6} country="in" category="technology" Heading="Technology" />}/>
          </Routes>
        </Router>
      </>
    )
  }
}

