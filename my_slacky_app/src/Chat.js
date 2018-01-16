import React, { Component } from "react";
import "./App.css";

function Chat(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Slacky Chat</h1>
      </header>

      <p className="App-intro">New message :</p>
      <form onSubmit={props.handleSubmitChat}>
        <input
          type="text"
          id="newChat"
          value={props.newChat}
          onChange={props.handleInputChat}
        />
        <input type="submit" value="Submit" />
        <p className="App-intro">Conversation :</p>
        {props.chatList.map(chat => (
          <div>
            <span className="UserName">{chat.user} : </span>
            <span>{chat.message}</span>
          </div>
        ))}
      </form>
    </div>
  );
}

export default Chat;
