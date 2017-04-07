import React, {Component} from 'react';

class Message extends Component {
  render() {
    const colorText = {
      color: this.props.color
    };
    
    let img = "";
    if (this.props.img) {
      img = <section><img src={this.props.img} alt={this.props.content} /></section>;
    }

    return (
      <div className="message">
        <section>
          <span style={colorText} className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </section>
        {img}
      </div>
    );
  }
}

export default Message;
