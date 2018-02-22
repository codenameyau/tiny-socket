import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.5em;
	font-family: monospace;
`;

export const Stringify = (props) => {
	return (
		<div>
			{JSON.stringify(props.children)}
		</div>
	);
}
