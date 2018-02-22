'use strict';

window.WebSocket = window.WebSocket || window.MozWebSocket;

var connection = new WebSocket('wss://owlette.herokuapp.com/colors');

connection.onopen = () => {
  console.log('opened');
};

connection.onerror = function(error) {
  console.error(error);
};

connection.onmessage = function (message) {
  console.log(message);
  const data = message.data;
  const colorNode = document.querySelector('.color');
  colorNode.style.backgroundColor = data;
  colorNode.innerText = data;
};
