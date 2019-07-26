import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

export default class App extends Component {
  nameRef = React.createRef();
  passwordRef = React.createRef();

  onSubmit = event => {
    event.preventDefault()
    const user = {
      username: this.nameRef.current.value,
      password: this.passwordRef.current.value
    }
    axios.post('http://localhost:3300/api/auth/register', user)
      .then(res => {
        alert(res.data.message)
        window.location.href = "http://localhost:3000/login"
      }).catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="App" >
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            required
            placeholder="enter your name"
            ref={this.nameRef}
          />
          <input
            type="password"
            required
            placeholder="choose a password"
            ref={this.passwordRef}
          />
          <input
            type="submit"
          />
        </form>
      </div>
    );
  }
}
