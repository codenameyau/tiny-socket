import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Colors from './components/Colors.js';
import store from './store';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Colors />
      </Provider>
    );
  }
}

export default App;
