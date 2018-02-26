import React from 'react';
import styled from 'styled-components';
import { TransitionGroup } from 'react-transition-group';
import { Fade } from '../core/Transitions';
import TwitterIcon from '../icons/twitter.svg';

const EmptyTweets = styled.div`
  max-width: 42em;
  margin: 3em auto;
  text-align: center;
`;

const TweetList = styled.div`
  max-width: 42em;
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

  &:not(:first-child) {
    border-top: 1px solid #e5e5e5;
  }
`;

const TweetIcon = styled.div`
  min-width: 3em;
`;

const TweetText = styled.div`
  flex-grow: 1;
`;

const TweetLink = styled.a`
  text-decoration: none;
  color: #1da1f2;
`;

const HashTagTweet = (props) => {
  const words = props.children.split(' ');

  const renderHashTag = (word) => (
    <TweetLink href={`https://twitter.com/search?q=${word.slice(1)}`} target="_blank">
      {word}
    </TweetLink>
  )

  const renderMention = (word) => (
    <TweetLink href={`https://twitter.com/${word.slice(1)}`} target="_blank">
      {word}
    </TweetLink>
  );

  const wordsToLink = words.map((word) => {
    return (
      word.indexOf('#') === 0 ? { text: word, type: 'hashtag' } :
      word.indexOf('@') === 0 ? { text: word, type: 'mention' } :
      { text: word, type: null }
    )
  });

  return (
    <TweetText>
      { wordsToLink.map((word, index) => {
          const wordText = word.text + ' ';
          return (
            word.type === 'hashtag' ? renderHashTag(wordText) :
            word.type === 'mention' ? renderMention(wordText) :
            <span>{wordText}</span>
          )
        }) }
    </TweetText>
  )
};

class Tweets extends React.Component {
  constructor(props) {
    super(props);

    this.socketDestination = 'wss://owlette.herokuapp.com/tweets';
    this.socket = null;

    this.state = {
      ready: false,
      tweets: [{ "tweet": "Zacks: Analysts Anticipate AxoGen, Inc. $AXGN Will Announce Quarterly Sales of $16.09 Million https://t.co/P5skBF05JC #investing", "followers": 227, "retweets": 0, "timestamp": 10851.435, "messageId": 5 }, { "tweet": "Harju Elekter Report  #Estonia #CorporateResearch #CFOs #Diversification", "followers": 1230, "retweets": 0, "timestamp": 10797.005000000001, "messageId": 4 }, { "tweet": "Vodafone Partners With Samsung Electronics To Launch Smart Home Services - Nasdaq https://t.co/u2Zm7iKi17 #IoT", "followers": 8257, "retweets": 0, "timestamp": 4389.445000000001, "messageId": 3 }, { "tweet": "RT fintraksoftware: Banking + Fintech Conference in #NewYork \n#banking #fintech #innovation #technology #innovation… https://t.co/Lf6EL4uROz", "followers": 20126, "retweets": 0, "timestamp": 2907.92, "messageId": 2 }, { "tweet": "IM and its Affiliates acted as a financial advisor for Energy King, Inc.Acquisition Funding $5,000,000… https://t.co/hdk7nR6dMj", "followers": 2563, "retweets": 0, "timestamp": 941.5700000000002, "messageId": 1 }]
    }

    this.messageId = this.state.tweets.length; // since stream doesn't have id.
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
    	const data = {
        ...JSON.parse(message.data),
        timestamp: message.timeStamp,
        messageId: this.messageId
      };

      console.log(data);

    	data.tweet && this.setState({
    		tweets: [data, ...this.state.tweets].slice(0, 100)
      });

      this.messageId += 1;
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
      return tweets.map((tweet) => (
        <Fade key={tweet.messageId} duration={1000}>
          <TweetItem>
            <TweetIcon>
              <img width="20" src={TwitterIcon} alt="Twitter bird" />
            </TweetIcon>
            <HashTagTweet>
              {tweet.tweet}
            </HashTagTweet>
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
