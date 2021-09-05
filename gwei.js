
let wsObj;
let wsUrl = 'wss://www.gasnow.org/ws';
let rapidObj = document.getElementById('rapid');
let fastObj = document.getElementById('fast');
let standardObj = document.getElementById('standard');
let slowObj = document.getElementById('slow');

let updatePageGasPriceData = (data) => {
  // console.log(data.gasPrices);
  let gweiDigits = 1000000000;

  if (data && data.gasPrices) {
    rapidObj.innerHTML = Math.floor(data.gasPrices.rapid / gweiDigits);
    fastObj.innerHTML = Math.floor(data.gasPrices.fast / gweiDigits);
    standardObj.innerHTML = Math.floor(data.gasPrices.standard / gweiDigits);
    slowObj.innerHTML = Math.floor(data.gasPrices.slow / gweiDigits);
  }
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

