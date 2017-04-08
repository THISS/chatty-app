import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  renderMessages(messages) {
    return messages.map((message) => {
      let color = "#ccc";
      const colorArr = ["tomato", "blue", "red", "green"];
      color = colorArr[message.colorNum];
      
      return <Message key={message.id} color={color}
      username={message.username} content={message.content}
      img={message.img} type={message.type} />;
    });
  }
  render() {
    const messages = this.renderMessages(this.props.messages);
    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}

export default MessageList;