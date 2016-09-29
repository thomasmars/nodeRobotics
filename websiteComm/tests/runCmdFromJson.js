const request = require('request');
const pyComm = require('../../pyComm/sendCommandsAPI')

let lastCommandIssued = {}
let keepAlive = true

const getCommand = () => {
  request('http://192.168.1.142:8020', (err, res, body) => {
    // console.log("res", res.toJSON())
    const parsedBody = JSON.parse(body)
    const cmdObject = parsedBody['new_val']


    console.log(cmdObject);
    console.log("specific cmd", cmdObject.command)
    console.log("date issued", cmdObject.date)

    // Set command if it is new
    if (cmdObject.id !== lastCommandIssued.id) {
      console.log("setting new command!")
      lastCommandIssued = cmdObject
      executeCommand(cmdObject.command)
      if (cmdObject.command === 'exit') {
        keepAlive = false
      }
    }
  })
}

const executeCommand = (cmd) => {
  console.log("executing command", cmd)
  pyComm.sendCommand(cmd)
}

const pollForCommand = () => {
  console.log("waiting 2 secs")
  setTimeout(() => {
    // Wait 5 seconds before polling for a new command
    getCommand()
    if (keepAlive) {
      pollForCommand()
    }
  }, 2000)
}

pyComm.spawnProcess()
pollForCommand()
