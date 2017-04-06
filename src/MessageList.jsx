import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Brenton"
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({name: "Lighthouse"});
    }, 3000);
  }

  renderMessages(messages) {
    if (messages.length) {
      return messages.map((message, index) => {
        return <Message key={index} username={message.username} content={message.content}/>;
      });
      
    }
  }


  render() {


    const messages = this.renderMessages(this.props.messages);

    return (
      <main className="messages">

        {messages}

        <div className="message system">
          Anonymous1 changed their name to {this.state.name}
        </div>
      </main>
    );
  }
}

export default MessageList;