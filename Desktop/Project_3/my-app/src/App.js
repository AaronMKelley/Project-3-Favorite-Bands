import React, { Component } from 'react';
import './App.css';
import SignUpForm from '../../my-app/src/signUp';
import LoginForm from '../../my-app/src/signIn';
import './materialize.css'
import { _signUp, _login } from './services/AuthService.js';
import { throwStatement } from '@babel/types';

const axios = require('axios');


class App extends Component {
  constructor() {
    super();


    this.state = {
      log_out:false,
      sign_in:false,
      sign_up:false,
      logged_in: false,
    };

   
  }

  getToken = () => {
    return localStorage.getItem('token');
  }

  //Need to add componentDidMount()

 

  signUpLink = (event)=>{
    this.setState({sign_up:true});
  }
  
  signInLink = (event)=>{
   this.setState({sign_in:true})
  }


    signUp = (event) => {
    event.preventDefault();
    // this.setState({log_out:true})
  
    let inputs =event.target.children;
  
    let email=inputs[0].value;
    let password_hash= inputs[2].value;
    let password_confim=inputs[4].value;
    let profile_picture= inputs[6].value;
    let spotify_playlist_link=inputs[8].value;
    console.log(email, password_hash,profile_picture,spotify_playlist_link)
  
    if (password_hash===password_confim){
  
    return _signUp(email, password_hash,profile_picture,spotify_playlist_link).then(res =>{
        console.log(res);
        alert(res.message)
      });
    }else {
      alert('your passwords must match!')
    }
  }



  login = (event) => {
    // event.preventDeafult();

    let inputs =event.target.children;

    let email =inputs[0].value;
    let password_hash =inputs[2].value;

    return _login(email,password_hash).then(res => {
      if (res.token){
        this.setState({logged_in:true}, function(){
          localStorage.setItem('token',res.token);
        })
      }else {
        alert('you were not logged in')
      }
    })
  }
  
// start at logout 
logout = (event) => {
  event.preventDeafult();

  this.setState({logged_in:false}, function(){
    localStorage.removeItem('token')
  })
}



zipFinder = (event) => {
  // event.preventDeafult();

  let venues= []
  let inputs =event.target.children
  let zip = inputs[0].value
  
  return axios({
    method: 'GET',
    url: `https://api.seatgeek.com/2/venues?postal_code=${zip}&client_id=MTY2Mjc3MDV8MTU1NzgwMjk5MC41OA`,
    responseType: 'JSON'
  })
    .then(function (response) {
      venues = response.data.venues;

      for (var i = 0; i < venues.length; i++) {
        console.log(venues[i].name);
        var venueId = venues[i].id;
        axios({
          method: 'GET',
          url: `https://api.seatgeek.com/2/events?taxonomies.name=concert&venue.id=${venueId}&client_id=MTY2Mjc3MDV8MTU1NzgwMjk5MC41OA`,
          responseType: 'JSON'
        })
          .then(function (response) {
            // console.log(response.data.events);
          })
          .catch(function (error) {
            alert('this works')
            console.log(error);
          })
      }
    })
    .catch(function (error) {
      console.log(error);


      let venues=this.state.venues.map(prevVenues =>{
        this.setState({venues})
      })
     
    })
   
 


  



 }
  render() {
   
    let form=" "

if(this.state.sign_up==true){
  form=  <h1>Sign Up Page <SignUpForm signUpId="editForm" func={this.signUp} submitButton="sign up" /></h1>
}else if (this.state.sign_in==true){
  form = <h1>Sign In<LoginForm signinId="editForm" func={this.login} submitButton="Login"/></h1>
}
  
    return (
      <div className="App">

        <header className="App-header">
        <button onClick={()=> this.signUpLink()}>Make An Account</button>

<button onClick={()=> this.signInLink()}>Sign In</button>
                   {this.state.sign_up ? " ": " "} <br />
                    {this.state.sign_in ? "" : ""} <br />
                      {form}
             
        
        <form id="zipId" onSubmit={this.zipFinder}
        ><input name="zip" type="text" placeholder='enter your zip code'>
       </input> <button >Submit 2</button>
        

        
        </form>

        </header>
      </div>
    );
  }
}

export default App;
