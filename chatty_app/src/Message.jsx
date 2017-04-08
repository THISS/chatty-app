import React, {Component} from 'react';

class Message extends Component {
  render() {
    // Style points
    const colorText = {
      color: this.props.color
    };

    let messageDiv = "";
    let img = "";

    if (this.props.img) {
      img = <img src={this.props.img} />;
    }

    if (this.props.type === "incomingNotification"){
      messageDiv = (
        <div className="message system">
          {this.props.content}
        </div>
      );
    }else {
      messageDiv = (
        <div className="message">
          <section>
            <span style={colorText} className="message-username">{this.props.username}</span>
            <span className="message-content">{this.props.content}{img}</span>
          </section>
        </div>
      );

    }
    return messageDiv;
  }
}

export default Message;
