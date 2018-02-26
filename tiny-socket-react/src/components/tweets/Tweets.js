import React, { Component } from 'react';
import { Container } from '../core/Containers';

class Tweets extends Component {
	constructor(props) {
		super(props);

		this.socketDestination = 'wss://owlette.herokuapp.com/tweets';
		this.socket = null;

		this.state = {
			ready: false,
			data: {}
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
			this.setState({ data });
		};
	}
  render() {
		const { data } = this.state;

		return (
			<div>
				Tweets
			</div>
    );
  }
}

export default Tweets;
