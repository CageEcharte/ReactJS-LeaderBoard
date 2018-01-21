import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import axios from 'axios';

import CamperList from './camperlist'



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentCampers: [],
      allTimeCampers: [],
      currentView: 'recentCampers'
    }


   }

  componentWillMount() {
     let current = this;
  axios.all([this.fetchRecent(), this.fetchAllTime()]).then(axios.spread(function(recentCampers, allTimeCampers){
    current.setState({ recentCampers, allTimeCampers});
  }));
}


   fetchRecent(){
     return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
   }

   fetchAllTime(){
     return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
   }

   changeView(currentView){
     this.setState({currentView})
   }

   render() {
     return (
<div>
<h2> viewing top {this.state.currentView} </h2>
 <button onClick={()=> this.changeView('recentCampers')} className="btn btn-primary"> Recent </button>
 <button onClick={() => this.changeView('allTimeCampers')} className="btn btn-primary"> All Time </button>
<CamperList campers={this.state[this.state.currentView]}/>

 </div>
);

}
}
