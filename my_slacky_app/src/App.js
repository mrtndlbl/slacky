import React, { Component } from "react";
import "./App.css";
import Authent from "./Authent";
import Chat from "./Chat";

class App extends Component {
  constructor(props) {
    super(props);
    this.ws = new WebSocket("ws://localhost:4000");
    this.state = {
      newLogin: "",
      user: undefined,
      newChat: "",
      chatList: [],
      userList: []
    };
  }

  componentDidMount() {
    this.ws.onmessage = (event) => {

      console.log(event.data)
      let tempUserList = JSON.parse(event.data).userList;
      this.setState({userList: tempUserList})
    };
    window.addEventListener("beforeunload", () => this.ws.send("CLOSE"));
  };

  handleInputAuthent = event => {
    this.setState({ newLogin: event.target.value });
  };

  handleSubmitAuthent = event => {
    event.preventDefault();
    let tempUser = this.state.newLogin;
    let tempUserList = this.state.userList.slice();
    tempUserList.push({ user: tempUser});
    this.setState({ user: tempUser, userList: tempUserList });
    this.ws.send(JSON.stringify(this.state));
  };

  handleInputChat = event => {
    this.setState({ newChat: event.target.value });
  };

  handleSubmitChat = event => {
    event.preventDefault();
    let newChatList = this.state.chatList;
    newChatList.push({ user: this.state.user, message: this.state.newChat });
    this.setState({ chatList: newChatList, newChat: "" }, () => {
      this.ws.send(JSON.stringify(this.state.chatList));
    });

  };

  render() {
    return (
      <div className="App">
        {this.state.user ? (
          <Chat
            user={this.state.user}
            chatList={this.state.chatList}
            newChat={this.state.newChat}
            handleInputChat={this.handleInputChat}
            handleSubmitChat={this.handleSubmitChat}
          />
        ) : (
          <Authent
            handleInputAuthent={this.handleInputAuthent}
            newLogin={this.state.newLogin}
            handleSubmitAuthent={this.handleSubmitAuthent}
          />
        )}
        <p>There is <span id="nbUsers">{this.state.userList.length}</span> users connected.</p>

      </div>
    );
  }
}

export default App;
