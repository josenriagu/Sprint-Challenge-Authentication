import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  nameRef = React.createRef()
  passwordRef = React.createRef()


  
  render() {
    return (
      <div className="App" >
        <form>
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
