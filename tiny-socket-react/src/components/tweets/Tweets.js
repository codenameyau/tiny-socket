import React from 'react';
import styled from 'styled-components';

const EmptyTweets = styled.div`
	max-width: 40em;
	margin: 2em auto;
	text-align: center;
`;

const TweetList = styled.div`
	max-width: 40em;
	margin: 2em auto;
	border: 1px solid #ccc;
	border-radius: 0.25em;
`;

const TweetItem = styled.div`
	border: 1px solid #ccc;
	min-height: 4em;
	padding: 4em;
`;

class Tweets extends React.Component {
	constructor(props) {
		super(props);

		this.socketDestination = 'wss://owlette.herokuapp.com/tweets';
		this.socket = null;

		this.state = {
			ready: false,
			tweets: []
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
