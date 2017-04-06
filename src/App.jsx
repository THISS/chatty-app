import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser:{name: "Brenton"},
      messages: [
        {
          username: "Brenton", 
          content: "Has anyone seen my marbles?"
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Brenton. You lost them for good."
        },
        {
          username: "Anonymous",
          content: "Why won't you talk to me now?..."
        }
      ]
    };
  }

  broadcastMessage (e) {
    console.log(e);
    // const newMessage = 1;
    // this.setState(messages);
  }

  componentDidMount() {
    console.log("simulating an incoming message");
    setTimeout(() => {
      const newMessage = {username: "Jeff", content: "Wanna go get some food"};
      const messages = this.state.messages.concat(newMessage);
      // using es6 with same name
      this.setState({messages});
    }, 4000);
  }

  render() {
    console.log("App component");
    return (
      <div>
        <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;

