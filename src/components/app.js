import React, { Component } from 'react';
import AppBar from './AppBar';
import Sentiment from './Sentiment';
import SuggestedQuotes from './SuggestedQuotes';

export default class App extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <Sentiment />
        <SuggestedQuotes />
      </div>
    );
  }
}
