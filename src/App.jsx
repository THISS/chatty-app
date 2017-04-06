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

  handleKeyup (e) {
    if (e.which === 13 && e.target.value) {
      const name = this.state.currentUser.name;
      const message = e.target.value;
      // Reset the value
      e.target.value = "";

      const newMessage = {
        username: name,
        content: message
      };

      const messages = this.state.messages.concat(newMessage);

      this.setState({messages});
    }
  }

  componentDidMount() {

    setTimeout(() => {
      const newMessage = {username: "Jeff", content: "Wanna go get some food"};
      const messages = this.state.messages.concat(newMessage);

      this.setState({messages});
    }, 4000);
  }

  render() {

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


