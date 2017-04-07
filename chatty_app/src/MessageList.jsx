import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  renderMessages(messages) {
    if (messages.length) {
      return messages.map((message) => {
        let color = "#ccc";

        switch(message.colorNum) {
          case 0:
            color = "tomato";
            break;
          case 1:
            color = "blue";
            break;
          case 2:
            color = "red";
            break;
          case 3:
            color = "green";
            break;
        }
        return <Message key={message.id} color={color} 
        username={message.username} content={message.content} 
        img={message.img}/>;
      });
      
    }
  }


  render() {


    const messages = this.renderMessages(this.props.messages);

    return (
      <main className="messages">

        <div className="message system">
          {this.props.notifications.oldName} changed their name to {this.props.notifications.newName}
        </div>
        
        {messages}

      </main>
    );
  }
}

export default MessageList;