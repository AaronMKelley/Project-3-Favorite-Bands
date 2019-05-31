import React, { Component } from 'react';
import './App.css';
import SignUpForm from '../../my-app/src/signUp';
import LoginForm from '../../my-app/src/signIn';
import './materialize.css'
import { _signUp, _login} from './services/AuthService.js';
import Zip from '../../my-app/src/zip'
import { throwStatement } from '@babel/types';
import { _artists } from './services/ArtistFinder.js';
import { _uri } from './services/uriFinder.js';


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
     
      intial: true,
      signed_up: false,
      welcome_page: true,
      artists:[],
      uri: null,
      loading: true

    };


  }
  
  getToken = () => {
    return localStorage.getItem('token');
  }

  //Need to add componentDidMount()
  componentDidMount(){

  }


  signUpLink = (event) => {
    this.setState({ sign_up: true, zip_form: false,welcome_page:false });
  }

  signInLink = (event) => {
    this.setState({ sign_in: true, sign_up:false, zip_form: false, welcome_page:false})
  }


  signUp = (event) => {
    event.preventDefault();


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
        this.setState({ signed_up: true, sign_up: false, })
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
        this.setState({ logged_in: true, sign_in: false, intial: false }, function () {
          localStorage.setItem('token', res.token);

        })

      } else {
        alert('you were not logged in')
      }
    })

  }


  logout = (event) => {
    this.setState({ logged_in: false , intial:true, welcome_page:true}, function () {
      localStorage.removeItem('token')
      alert('You have successfully logged out')
      
    })
  }

  artistFinder = (event) => {
    event.preventDefault();

    let inputs = event.target.children;
    let zip = inputs[0].value;


    


    return _artists(zip).then(res => { 
      debugger;
      this.setState({artists:res }, function() {
        _uri(this.state.artists[0]).then(res => {
          console.log(res);
          this.setState({uri: `https://open.spotify.com/embed/artist/${res.uri}`}, () => {
            this.setState({loading : false})
          });
          this.setState({loading : false})

        })
      } )

    })
  }




  render() {

    let welcome= " "
    if (this.state.welcome_page==true){
      welcome= 
      <div className='container'>
      <div className='row'>
      <h1 className='artist'>Find Concerts. Listen Now.</h1>
      <h3 className='artist'>Finding Local Artists and Concerts is Just a Few Clicks Away. Create an Account Today to Get Started</h3>
      </div>
        </div>
    }

    let form = " "
    if (this.state.sign_up == true) {
      form = <h1 className="artist">Sign Up Page <SignUpForm signUpId="editForm" func={this.signUp} submitButton="sign up" /></h1>
    } else if (this.state.sign_in == true) {
      form = <h1 className="artist">Sign In<LoginForm signinId="editForm" funct={this.login} submitButton="Login" /></h1>
    }

    let intial_page = " "

    if (this.state.intial == true) {
      intial_page =
        <div className='container'>
          <div className='row'>
            <div className='col s3'></div>
            <div className='col s3'><button className='top_button' onClick={() => this.signUpLink()}>Sign Up</button></div>
            <div className='col s3'><button className='top_button' onClick={() => this.signInLink()}>Sign In</button></div>
            <div className='col s3'></div>
            {this.state.sign_up ? " " : " "} <br />
            {this.state.sign_in ? "" : ""} <br />
          </div>
        </div>
    }


    let sign_in_only = " "
    if (this.state.signed_up == true) {
      sign_in_only = <div className='container'>
        <div className='row'>
          <div className='col s4'></div>
          <div className='col s4'><button className='top_button' onClick={() => this.login()}>Log In</button></div>
          <div className='col s4'></div>
        </div>
      </div>
    }

    let logout = " "
    let zip_zip
    if (this.state.logged_in == true) {
      logout = <div className='container'>
        <div className='row'>
          <div className='col s3'></div>
          <div className='col s3'><button className='top_button' onClick={() => this.signUpLink()}>Sign Up</button></div>
          <div className='col s3'><button className='top_button' onClick={() => this.logout()}>Log Out</button></div>
          <div className='col s3'></div>
          {this.state.sign_up ? " " : " "} <br />
          {this.state.sign_in ? "" : ""} <br />

        </div>
      </div>
      zip_zip = <h2 className='artist'>Local Concert Search<Zip zipId="editForm" func={this.zipFinder} submitButton="Find Venues" /></h2>
    }


    return (
      <div className="App">

        <header className="App-header">

          {intial_page}
          {logout}
        </header>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Kanit:800|Playfair+Display|Poppins&display=swap" rel="stylesheet"></link>

        {welcome}
        {form}
        {zip_zip}

        {this.state.title.map(function (t) {
          return (<ul><li className='artist_list'>{t}</li></ul>
          )
        })}


          <Zip zipId="editForm" func={this.artistFinder} submitButton="Find Venues" />
          {!this.state.loading && <iframe src={this.state.uri} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media" />}


{this.state.artists.map(function(t){
  return (<p key={t.id}>{t}</p>)
})}
      


      </div>
    );
  }
}

export default App;
