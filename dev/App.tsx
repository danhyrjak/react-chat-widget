import React, { Component } from 'react';

interface XXProps {
  text: string;
  author: string; 
  timestamp: Date;
  isClient: boolean;
}

class XX extends Component<XXProps>{
  render(){
    return (
    <div className={`rcw-${this.props.isClient ? "client" : "response"}`}>
      <div className="rcw-message-text">
        {this.props.author ? <h5 className="rcw-snippet-title">{this.props.author}</h5> : null}
        <p>{this.props.text}</p>
      </div>
      {this.props.timestamp ? <span className="rcw-timestamp">{this.props.timestamp.toISOString()}</span> : null}
    </div>
    );
  }
}


import { Widget, renderCustomComponent, toggleInputDisabled, toggleWidget, addResponseMessage, setQuickButtons, toggleMsgLoader, addLinkSnippet } from '../index';
import { addUserMessage } from '..';

export default class App extends Component {
  componentDidMount() {
    //addResponseMessage('Welcome to this awesome chat!');
    //addLinkSnippet({ link: 'https://google.com', title: 'Google' });
    //addResponseMessage('![](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)');
    //addResponseMessage('![vertical](https://d2sofvawe08yqg.cloudfront.net/reintroducing-react/hero2x?1556470143)');
    toggleWidget();
    const d = new Date();
    d.setMinutes(d.getMinutes() - 5);
    const d2 = new Date();
    d2.setMinutes(d2.getMinutes() - 4);
    renderCustomComponent(XX, {text: "Hi Mr customer, you have got some missing messages here boy", author: "Fred Smith", isClient: true, timestamp: d});
    renderCustomComponent(XX, {text: "howdy sir, here is my issue", author: "Jane Jones", isClient: false, timestamp: d2});
    setQuickButtons([{label: "Start Chat", value: "start"}, {label: "Close Chat", value: "close"}]);
    //toggleInputDisabled();
  }

  handleNewUserMessage = (newMessage: any) => {
    toggleMsgLoader();
    setTimeout(() => {
      toggleMsgLoader();
      if (newMessage === 'fruits') {
        setQuickButtons([ { label: 'Apple', value: 'apple' }, { label: 'Orange', value: 'orange' }, { label: 'Pear', value: 'pear' }, { label: 'Banana', value: 'banana' } ]);
      } else {
        addResponseMessage(newMessage);
      }
    }, 2000);
  }

  handleQuickButtonClicked = (e: any) => {
    addResponseMessage('Selected ' + e);
    toggleInputDisabled();
    // setQuickButtons([]);
  }

  handleSubmit = (msgText: string) => {
    //TODO: send to server
    console.log(`send to server: ${msgText}`);
  }

  render() {
    return (
      <div>
        <Widget
          title="Customer Chat"
          subtitle=""
          handleNewUserMessage={this.handleNewUserMessage}
          handleQuickButtonClicked={this.handleQuickButtonClicked}
          launcher={handleToggle => <></>}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
