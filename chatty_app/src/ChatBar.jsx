import React, {Component} from 'react';

class ChatBar extends Component {
  handleUserKeyPress (e) {
    if (e.which !== 13) return;
    this.props.updateUsernameHandler(e.target.value);
  }

  handleMessageKeyPress (e) {
    if (e.which !== 13 || !e.target.value) return;
    this.props.sendMessageHandler(e.target.value);
    // reset the message to no content
    e.target.value = "";
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} 
        onKeyPress={this.handleUserKeyPress.bind(this)}  />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER"
        ref={(message) => { this.chatMessage = message; }}
        onKeyPress={this.handleMessageKeyPress.bind(this)} />
      </footer>
    );
  }
}

export default ChatBar;