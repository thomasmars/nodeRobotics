var net = require('net')

var client = new net.Socket();
client.setEncoding('utf8')
client.connect(8020, '192.168.1.142', () => {
  console.log("connected to server!")
  client.write('Hello server, can you hear me ?')

  setTimeout(() => {
    console.log("10 seconds passed")
    client.write('Goodbye serve, closing connection')

    client.end();
  }, 10000)

})

client.on('data', (data) => {
  console.log("client received", data)
})

client.on('close', () => {
  console.log("connection closed!")
})
