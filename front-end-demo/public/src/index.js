'use strict';

window.WebSocket = window.WebSocket || window.MozWebSocket;

const OWLETTE_COLORS = 'wss://owlette.herokuapp.com/colors';
const OWLETTE_TWEETS = 'wss://owlette.herokuapp.com/tweets/MJ';
const OWLETTE_TICKER = 'wss://owlette.herokuapp.com/ticker';
const SOCKET_CONNECTION = OWLETTE_COLORS;

var connection = new WebSocket(SOCKET_CONNECTION);

connection.onopen = () => {
  console.log('opened');
};

connection.onerror = function(error) {
  console.error(error);
};

connection.onmessage = function (message) {
  console.log(message);
  const data = JSON.parse(message.data);
  const color = data && data.color;
  const colorNode = document.querySelector('.color');
  colorNode.style.backgroundColor = color;
  colorNode.innerText = message.data;
};
