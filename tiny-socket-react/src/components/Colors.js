import React, { Component } from 'react';
import { Container, Stringify } from './core/Containers';

const ColoredContainer = Container.extend`
	background-color: ${({ color }) => color };
`;

class Colors extends Component {
	constructor(props) {
		super(props);

		this.socketDestination = 'wss://owlette.herokuapp.com/colors';
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
			<ColoredContainer color={data.color} >
				<Stringify>{data}</Stringify>
			</ColoredContainer>
    );
  }
}

export default Colors;
