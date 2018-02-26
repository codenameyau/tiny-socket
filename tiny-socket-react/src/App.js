import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';

import store from './store';
import Navbar from './components/core/Navbar';
import Colors from './components/colors/Colors';
import Tweets from './components/tweets/Tweets';
import Tickers from './components/tickers/Tickers';

import './App.css';

const AppContainer = styled.div`
`;

const PrimaryLayout = () => {
  return (
    <AppContainer>
      <header>
        <Navbar />
      </header>
      <main>
        <Route path="/" exact component={Tweets} />
        <Route path="/tweets" exact component={Tweets} />
        <Route path="/colors" exact component={Colors} />
        <Route path="/tickers" exact component={Tickers} />
      </main>
    </AppContainer>
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
