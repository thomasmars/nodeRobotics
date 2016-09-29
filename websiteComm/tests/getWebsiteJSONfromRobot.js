const request = require('request');
// const sendCommand = require('../pyComm/sendCommandsAPI')

var lastCommandIssued = {}

const getCommand = () => {
  request('http://192.168.1.142:8020', (err, res, body) => {
    console.log("err", err)
    // console.log("res", res.toJSON())
    console.log("body", body)
    const parsedBody = JSON.parse(body)
    const cmdObject = parsedBody['new_val']


    console.log(cmdObject);
    console.log("specific cmd", cmdObject.command)
    console.log("date issued", cmdObject.date)

    // Set command if it is new
    if (cmdObject.id !== lastCommandIssued.id) {
      console.log("setting new command!")
      lastCommandIssued = cmdObject
      // executeCommand(cmdObject.command)
    }
  })
}
//
// const executeCommand = (cmd) => {
//   console.log("executing command", cmd)
//   sendCommand(cmd)
// }

const pollForCommand = () => {
  console.log("waiting 5 secs")
  setTimeout(() => {
    // Wait 5 seconds before polling for a new command
    getCommand()
    pollForCommand()
  }, 5000)
}

pollForCommand()
