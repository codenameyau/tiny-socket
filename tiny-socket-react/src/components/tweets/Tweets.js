import React from 'react';
import styled from 'styled-components';
import { TransitionGroup } from 'react-transition-group';
import { Fade } from '../core/Transitions';
import TwitterIcon from '../icons/twitter.svg';

const EmptyTweets = styled.div`
  max-width: 45em;
  margin: 3em auto;
  text-align: center;
`;

const TweetList = styled.div`
  max-width: 45em;
  margin: 3em auto;
  border: 1px solid #eee;
  -webkit-box-shadow: 2px 16px 92px 2px rgba(224,217,224,0.95);
  -moz-box-shadow: 2px 16px 92px 2px rgba(224,217,224,0.95);
  box-shadow: 2px 16px 92px 2px rgba(224,217,224,0.95);
`;

const TweetItem = styled.div`
  min-height: 1.75em;
  padding: 1.75em;
  background: #fff;
  font-family: monospace;
  color: #333;
  display: flex;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid #e5e5e5;
  }
`;

const TweetIcon = styled.div`
  min-width: 3em;
`;

const TweetText = styled.div`
  flex-grow: 1;
`;

class Tweets extends React.Component {
  constructor(props) {
    super(props);

    this.socketDestination = 'wss://owlette.herokuapp.com/tweets';
    this.socket = null;

    this.state = {
      ready: false,
      tweets: [{ "tweet": "Crisis: Poverty Pay, Food Stamps At American Airlines https://t.co/2ta2xG9P0N #Investing", "followers": 460, "retweets": 0 }, { "tweet": "Why Charging Your Electric Car at Night Could Save the World - #Bloomberg #investorseurope #finance #news #tax… https://t.co/suhgNWRfoL", "followers": 814, "retweets": 0 }].reverse()
    }
  }
  componentWillMount() {
    this.socket = new WebSocket(this.socketDestination);

    this.socket.onopen = (event) => {
    	console.log('opened socket connection to: ' + this.socketDestination);
    };

    this.socket.onerror = (error) => {
      console.error(error);
    };

    this.socket.onmessage = (message) => {
    	console.log(message);
    	const data = JSON.parse(message.data);

    	data.tweet && this.setState({
    		tweets: [data, ...this.state.tweets].slice(0, 100)
    	});
    };
  }

  render() {
    const { tweets } = this.state;

    const renderNoTweet = () => (
      <EmptyTweets>
        Looking for tweets...
      </EmptyTweets>
    )

    const renderTweets = () => {
      return tweets.map((tweet, index) => (
        <Fade key={index}>
          <TweetItem>
            <TweetIcon>
              <img width="20" src={TwitterIcon} alt="Twitter bird" />
            </TweetIcon>
            <TweetText>
              {tweet.tweet}
            </TweetText>
          </TweetItem>
        </Fade>
      ))
    };

    return tweets.length ? (
      <TweetList>
        <TransitionGroup>
          {renderTweets()}
        </TransitionGroup>
      </TweetList>
    ) : renderNoTweet();
  }
}

export default Tweets;
