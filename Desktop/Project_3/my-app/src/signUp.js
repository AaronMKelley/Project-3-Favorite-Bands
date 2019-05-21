import React, { Component } from 'react'
// import React from 'react';
import './App.js'



class SignUpForm extends Component{
    render(){
        return(
    <form id={this.props.signupId} onSubmit={this.props.func} >
    <input type="text" name='email' placeholder='enter email' />
    <p></p>
    <input type="text" name='password' placeholder='please enter a password '/>
    <p></p>
    <input type="text" name="password" placeholder="confirm your password" />
    <p></p>
    <input type="file"
       name='pic' 
       accept="image/png, image/jpeg" placeholder='upload photo'/>
       <p></p>
    <input type='url' name='spotifyPlaylist' placeholder='enter your spotify playlist!'/>
    <p></p>
    <button > {this.props.submitButton} </button>
    <p></p>
    </form>
        )
    }
}


    





export default SignUpForm;