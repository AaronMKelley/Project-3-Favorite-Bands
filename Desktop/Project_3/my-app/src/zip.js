import React, { Component } from 'react'
// import React from 'react';
import './App.js'
import './materialize.css'

class Zip extends Component {
    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col s4'></div>
                    <div className='col s4'>
                        <form id={this.props.zipID} onSubmit={this.props.func}
                        ><input name="zip" type="text" placeholder='enter your zip code'>
                            </input> <button >Find Venue</button>


                        </form>
                    </div>

                    <div className='col s4'>
                    </div>
                </div>
            </div>


        )
    }
}





export default Zip;