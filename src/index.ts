import express from 'express'
import WebSocket from 'ws';

const app: express.Express = express()
const port: number = 3000

let ws: WebSocket

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

  ws = new WebSocket('wss://ftx.com/ws/', {
    perMessageDeflate: false
  });

  ws.on('open', () => {
    sendMessage({ 'op': 'subscribe', 'channel': 'trades', 'market': 'BTC-PERP' })
  });

  ws.on('message', (data: WebSocket.RawData) => {
    receiveMessage(data)
  });
})


function sendMessage(message: object) {
  ws.send(JSON.stringify(message));
}

function receiveMessage(message: WebSocket.RawData) {
  console.log('received: %s', message);
}