


const { time } = require('console');
const WebSocket = require('ws');


let wsObj;
let wsUrl = 'wss://www.gasnow.org/ws';
var previous_time;
let rapidObj = document.getElementById('rapid');
let fastObj = document.getElementById('fast');
let standardObj = document.getElementById('standard');
let slowObj = document.getElementById('slow');

let updatePageGasPriceData = (data) => {

    if (previous_time == NaN){
        previous_time = Date.now();
    } else {
        var diff = Date.now() - previous_time;
        console.log(`seconds elapsed = ${Math.floor(diff / 1000)}`);
        previous_time = Date.now();
    }
  console.log(data.gasPrices);
//   if (data && data.gasPrices) {
//     rapidObj.innerHTML = data.gasPrices.rapid;
//     fastObj.innerHTML = data.gasPrices.fast;
//     standardObj.innerHTML = data.gasPrices.standard;
//     slowObj.innerHTML = data.gasPrices.slow;
//   }
};

wsObj = new WebSocket(wsUrl);
wsObj.onopen = (evt) => {
  console.log("Connection open ...");
};

wsObj.onmessage = (evt) => {
  const dataStr = evt.data;
  const data = JSON.parse(dataStr);
  
  if (data.type) {
    updatePageGasPriceData(data.data)
  }
};

wsObj.onclose = (evt) => {
  console.log("Connection closed.");
};

