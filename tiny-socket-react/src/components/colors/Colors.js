import React from 'react';
import styled from 'styled-components';
import { Stringify } from '../core/Utils';

export const Container = styled.div`
	display: flex;
	height: 100vh;
	justify-content: center;
	align-items: center;
	font-size: 1.5em;
	font-family: monospace;
	background-color: ${({ color }) => color };
`;

class Colors extends React.Component {
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
			<Container color={data.color} >
				<Stringify>{data}</Stringify>
			</Container>
    );
  }
}

export default Colors;
