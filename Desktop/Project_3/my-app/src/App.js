import React, { Component } from 'react';
import './App.css';
import SignUpForm from '../../my-app/src/signUp';
import LoginForm from '../../my-app/src/signIn';
import './materialize.css'
import { _signUp, _login, _zipCode } from './services/AuthService.js';
import Zip from '../../my-app/src/zip'
import { throwStatement } from '@babel/types';

const axios = require('axios');


class App extends Component {
  constructor() {
    super();


    this.state = {
      log_out: false,
      sign_in: false,
      sign_up: false,
      logged_in: false,
      zip_code: [],
      zip_form: true,
    };


  }

  getToken = () => {
    return localStorage.getItem('token');
  }

  //Need to add componentDidMount()



  signUpLink = (event) => {
    this.setState({ sign_up: true, zip_form: false });
  }

  signInLink = (event) => {
    this.setState({ sign_in: true, zip_form: false })
  }


  signUp = (event) => {
    event.preventDefault();
    // this.setState({log_out:true})

    let inputs = event.target.children;

    let email = inputs[0].value;
    let password_hash = inputs[2].value;
    let password_confim = inputs[4].value;
    let profile_picture = inputs[6].value;
    let spotify_playlist_link = inputs[8].value;
    console.log(email, password_hash, profile_picture, spotify_playlist_link)

    if (password_hash === password_confim) {

      return _signUp(email, password_hash, profile_picture, spotify_playlist_link).then(res => {
        console.log(res);
        alert(res.message)
      });
    } else {
      alert('your passwords must match!')
    }
  }



  login = (event) => {
    event.preventDefault();

    let inputs = event.target.children;

    let email = inputs[0].value;
    let password_hash = inputs[2].value;

    console.log(email, password_hash)


    return _login(email, password_hash).then(res => {
      if (res.token) {
        alert(res.message)
        this.setState({ sign_in: true }, function () {
          localStorage.setItem('token', res.token);

        })

      } else {
        alert('you were not logged in')
      }
    })

  }

  // start at logout 
  logout = (event) => {
    event.preventDefault();

    this.setState({ logged_in: false }, function () {
      localStorage.removeItem('token')
    })
  }

  zipFinder = (event) => {
    event.preventDefault();

    let inputs = event.target.children;
    let zip = inputs[0].value;

    return _zipCode(zip).then(res => {
      this.setState({ zip_code: zip }, function () {
        localStorage.removeItem("this")
      })
    })



  }
  render() {

    let form = " "



    if (this.state.sign_up == true) {
      form = <h1>Sign Up Page <SignUpForm signUpId="editForm" func={this.signUp} submitButton="sign up" /></h1>
    } else if (this.state.sign_in == true) {
      form = <h1>Sign In<LoginForm signinId="editForm" funct={this.login} submitButton="Login" /></h1>
    }

    let zip_zip = " "



    return (
      <div className="App">

        <header className="App-header">
          <div class='container'>
            <div className='row'>
              <div className='col s8'></div>
              <div className='col s2'><button onClick={() => this.signUpLink()}>Make An Account</button></div>
              <div className='col s2'><button onClick={() => this.signInLink()}>Sign In</button></div>

              {this.state.sign_up ? " " : " "} <br />
              {this.state.sign_in ? "" : ""} <br />

            </div>
          </div>
        </header>
        <body>
          {form}

          <Zip zipId="editForm" func={this.zipFinder} submitButton="Find Venues" />

        </body>


        <footer>
          <div>
            Home
  </div>
        </footer>
      </div>
    );
  }
}

export default App;
