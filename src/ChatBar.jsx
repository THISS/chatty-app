import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} 
        onKeyUp={this.props.updateUsernameHandler}  />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" 
        onKeyUp={this.props.sendMessageHandler} />
      </footer>
    );
  }
}

export default ChatBar;