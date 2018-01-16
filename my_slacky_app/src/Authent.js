import React, { Component } from 'react';
import './App.css';

function Authent(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to Slacky</h1>
      </header>
      <p className="App-intro">
        To get started, please enter your Name :
      </p>
      <form onSubmit={props.handleSubmitAuthent}>
        <input
          type="text"
          id="login"
          value={props.newLogin}
          onChange={props.handleInputAuthent}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Authent;
