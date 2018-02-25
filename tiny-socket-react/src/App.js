import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/core/Navbar';
import Colors from './components/colors/Colors';
import Tweets from './components/tweets/Tweets';
import store from './store';

import './App.css';

const PrimaryLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Route path="/" exact component={Colors} />
        <Route path="/tweets" exact component={Tweets} />
      </main>
    </div>
  )
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <PrimaryLayout />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
