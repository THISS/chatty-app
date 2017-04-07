import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      numUsers: 0,
      notifications: {oldName: "Anonymous", newName: "Anonymous"}
    };
  }

  handleSendMessage (e) {
    if (e.which === 13 && e.target.value) {
      const name = this.state.currentUser.name;
      const message = e.target.value;
      // Reset the value
      e.target.value = "";

      const newMessage = {
        type: "postMessage",
        username: name,
        content: message
      };
      this.websocket.send(JSON.stringify(newMessage));
    }
  }

  handleUpdateUsername (e) {
    if (e.which === 13) {
      const newUsername = (e.target.value) ? e.target.value : "Anonymous";
      const oldUsername = this.state.currentUser.name;
      // Set the current user name
      this.setState( {currentUser: {name: newUsername}} );
      const updateObj = {
        type: "postNotification",
        oldName: oldUsername,
        newName: newUsername
      };
      // notify all
      this.websocket.send(JSON.stringify(updateObj));
    }
  }

  usernameNotification (usernameChange) {
    this.setState( {notifications: {oldName: usernameChange.oldName, newName: usernameChange.newName}} );
  }

  messageNotification (messageChange) {
    this.setState( {messages: this.state.messages.concat(messageChange)} );
  }

  setUserCount (countChange) {
    this.setState( {numUsers: countChange.numUsers} );
  }

  componentDidMount () {
    this.websocket = new WebSocket("ws://localhost:3001");

    this.websocket.onopen = (ws) => {
      console.log("Opened Connection");
    };

    this.websocket.onmessage = (message) => {
      const messageObj = JSON.parse(message.data);

      const incomingMessageTypeHandler = {
        incomingMessage: this.messageNotification,
        incomingNotification: this.usernameNotification,
        userCount: this.setUserCount
      };

      if (!incomingMessageTypeHandler[messageObj.type]) { throw new Error("Unknown event type " + messageObj.type); }
      incomingMessageTypeHandler[messageObj.type].call(this, messageObj);
    };
  }

  render() {
        
    return (
      <div>
        <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <div>
              {this.state.numUsers} Users Online
            </div>
        </nav>
        <MessageList messages={this.state.messages} notifications={this.state.notifications} />
        <ChatBar sendMessageHandler={this.handleSendMessage.bind(this)}
        updateUsernameHandler={this.handleUpdateUsername.bind(this)}
        currentUser={this.state.currentUser} />
      </div>
    );
  }
}

export default App;


