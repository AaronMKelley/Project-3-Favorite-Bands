import React, { Component } from 'react'
import './materialize.css'
import './App.js'



class LoginForm extends Component {
    render() {
        return (
            <form id={this.props.signinId} onSubmit={this.props.funct} >
                <input className="artist" type="text" name='email' placeholder='enter email' />
                <p></p>
                <input className="artist" type="text" name='password' placeholder='please enter a password ' />
                <p></p>
                <button className="artist">{this.props.submitButton} </button>
                <p></p>
            </form>

        )
    }
};

export default LoginForm;