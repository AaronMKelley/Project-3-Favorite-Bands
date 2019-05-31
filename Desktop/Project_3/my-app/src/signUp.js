import React, { Component } from 'react'
// import React from 'react';
import './App.js'
import './materialize.css'



class SignUpForm extends Component{
    render(){
        return(
            <div class="container">
    <form className="artist" id={this.props.signupId} onSubmit={this.props.func} >
    <input className="artist"  type="text" name='email' placeholder='enter email' />
    <p></p>
    <input className="artist" type="text" name='password' placeholder='please enter a password '/>
    <p></p>
    <input className="artist"type="text" name="password" placeholder="confirm your password" />
    <p></p>
    <input className="artist" type="file"
       name='pic' 
       accept="image/png, image/jpeg" placeholder='upload photo'/>
       <p></p>
    <input className="artist" type='url' name='spotifyPlaylist' placeholder='enter your spotify playlist!'/>
    <p></p>
    <button > {this.props.submitButton} </button>
    <p></p>
    </form>
    </div>
        )
    }
}


    





export default SignUpForm;