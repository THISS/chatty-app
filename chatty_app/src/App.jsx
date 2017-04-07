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
      this.state.websocket.send(JSON.stringify(newMessage));

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
      this.state.websocket.send(JSON.stringify(updateObj));
    }
  }

  usernameNotification (usernameChange) {
    this.setState( {notifications: {oldName: usernameChange.oldName, newName: usernameChange.newName}} );
  }

  messageNotification (messageChange) {
    this.setState( {messages: this.state.messages.concat(messageChange)} );
  }

  componentDidMount () {
    const websocket = new WebSocket("ws://localhost:3001");

    websocket.onopen = (ws) => {
      console.log("Opened Connection");
      this.setState({ websocket });
    };

    websocket.onmessage = (message) => {
      const messageObj = JSON.parse(message.data);
      switch(messageObj.type) {
      case "incomingMessage":
        this.messageNotification(messageObj);
        break;
      case "incomingNotification":
        this.usernameNotification(messageObj);
        break;
      case "userCount":
        this.setState({numUsers: messageObj.numUsers});
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + messageObj.type);
      }
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


