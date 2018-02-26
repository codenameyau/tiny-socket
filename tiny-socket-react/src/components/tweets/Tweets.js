import React from 'react';
import styled from 'styled-components';

const EmptyTweets = styled.div`
  max-width: 40em;
  margin: 3em auto 2em;
  text-align: center;
`;

const TweetList = styled.div`
  max-width: 40em;
  margin: 3em auto 2em;
  border: 1px solid #eee;
  -webkit-box-shadow: 2px 16px 92px 2px rgba(224,217,224,0.95);
  -moz-box-shadow: 2px 16px 92px 2px rgba(224,217,224,0.95);
  box-shadow: 2px 16px 92px 2px rgba(224,217,224,0.95);
`;

const TweetItem = styled.div`
  min-height: 1.5em;
  padding: 1.5em;
  background: #fff;
  font-family: monospace;
  color: #333;

  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
`;

class Tweets extends React.Component {
  constructor(props) {
    super(props);

    this.socketDestination = 'wss://owlette.herokuapp.com/tweets';
    this.socket = null;

    this.state = {
      ready: false,
      tweets: [{ "tweet": "#IoT &amp; #BigData Trends in #Finance: 5 Significant Shifts [2018] https://t.co/uIN9eFhV21 by @RedPixie", "followers": 1710, "retweets": 0 }, { "tweet": "Why Charging Your Electric Car at Night Could Save the World - #Bloomberg #investorseurope #finance #news #tax… https://t.co/suhgNWRfoL", "followers": 814, "retweets": 0 }]
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
    		tweets: [data, ...this.state.tweets]
    	});
    };
  }

  render() {
    const { tweets } = this.state;

    console.log(tweets)

    const renderNoTweet = () => {
      return (
        <EmptyTweets>
          Looking for tweets...
        </EmptyTweets>
      )
    }

    const renderTweets = () => {
      return tweets.map((tweet, index) => {
        return (
          <TweetItem key={index}>
            {tweet.tweet}
          </TweetItem>
        )
      })
    };

    return tweets.length ? (
      <TweetList>
        {renderTweets()}
      </TweetList>
    ) : renderNoTweet();
  }
}

export default Tweets;
