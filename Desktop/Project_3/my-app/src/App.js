import React, { Component } from 'react';
import './App.css';
import SignUp from '../../my-app/src/signUp';

class App extends Component {
  constructor() {
    super();

    this.state = {

    }

    //if we didn't use arrow syntax for the submitJoke function, we would have to do this in the constructor
    //this.submitJoke = this.submitJoke.bind(this);
  }

  // componentDidMount() {
  //   fetch("/jokes") //this returns a string
  //       .then(res => res.json()) //we convert that string to json and return it
  //       .then(jokes => this.setState({jokes})) //then we throw that jokes json into the state
  // }




  updateJoke = (event) => {
    event.preventDefault();

    let name = event.target.children[0].value

    let ob = { name };
    //if I console logged ob 
    //what would it look like?
    // { name : whateverTheyTypedIn}

    fetch(`/jokes/${this.state.edit_id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ob)
    }).then(res => res.json())
      .then(res => {

        fetch("/jokes") //this returns a string
          .then(res => res.json()) //we convert that string to json and return it
          .then(jokes => {
            this.setState({ jokes })

            this.setState({ edit: false });
            this.setState({ edit_id: 0 })


            document.forms[0].children[0].value = "";

          }) //then we throw that jokes json into the state
      })
  }

  //an advantage to using the arrow syntax for this function

  //this here is the same as
  submitJoke = (event) => {
    event.preventDefault();

    let name = event.target.children[0].value



    let ob = { name };
    //if I console logged ob 
    //what would it look like?
    // { name : whateverTheyTypedIn}

    fetch("/jokes", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ob)
    }).then(res => res.json())
      .then(res => {

        fetch("/jokes") //this returns a string
          .then(res => res.json()) //we convert that string to json and return it
          .then(jokes => this.setState({ jokes })) //then we throw that jokes json into the state

        document.forms[0].children[0].value = '';
      })


    /*

      //if you want help on how to make the fetch call
        //refer to this
          //https://github.com/pavankat/books-react-app/blob/master/client/src/services/BookService.js

      make the fetch call to the server.js insert joke route

        and insert the joke 

          THEN do the fetch call from componentDidMount to reload the jokes into state

    */
  }

  render() {





    return (
      <div className="App">

        <header className="App-header">

          <h1>Sign Up Page</h1>


          <SignUp />





        </header>
      </div>
    );
  }
}

export default App;
