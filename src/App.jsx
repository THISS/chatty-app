import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Brenton"},
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
  // Keeping the console logs to show thought process
  handleKeyup (e) {
    console.log(e.target.value);

    if (e.which === 13) {
      const name = this.state.currentUser.name;
      const message = e.target.value;
      // Reset the value
      e.target.value = "";
      // console.log(name.value);
      // console.log(message.value);
      const newMessage = {
        username: name,
        content: message
      };
      // console.log(newMessage);
      // console.log(this.state);
      const messages = this.state.messages.concat(newMessage);
      // console.log({messages});
      this.setState({messages});
    }
  }

  componentDidMount() {
    // console.log("simulating an incoming message");
    setTimeout(() => {
      const newMessage = {username: "Jeff", content: "Wanna go get some food"};
      const messages = this.state.messages.concat(newMessage);
      // using es6 with same name
      this.setState({messages});
    }, 4000);
  }

  render() {
    // console.log("App component");
    return (
      <div>
        <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar keyupHandler={this.handleKeyup.bind(this)} currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;


