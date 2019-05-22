import React, { Component } from 'react'
import './materialize.css'
import './App.js'



class LoginForm extends Component {
    render() {
        return (
            <form id={this.props.signinId} onSubmit={this.props.funct} >
                <input type="text" name='email' placeholder='enter email' />
                <p></p>
                <input type="text" name='password' placeholder='please enter a password ' />
                <p></p>
                <button>{this.props.submitButton} </button>
                <p></p>
            </form>

        )
    }
};

export default LoginForm;