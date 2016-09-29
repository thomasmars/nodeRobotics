const spawn = require('child_process').spawn;


let py;

const spawnProcess = () => {
  py = spawn('python',
    ['../pyProjects/trivial/async_input_to_motor.py'],
    {
      uid: 0
    })

  py.stdout.on('data', (data) => {
    console.log("got data from py: ", data.toString())
  })

  py.on('exit', (code) => {
    console.log("py program exited with code!", code)
  })

  py.stdin.write('')

}



const sendCommand = (cmd) => {
  if (!py) {
    console.log("ERR: PY does not exists")
    return;
  }
  console.log("SENDING COMMAND", cmd)

  py.stdin.write(cmd + '\n')

  if (cmd === 'exit') {
    py.stdin.end()
  }
}

module.exports = {
  sendCommand,
  spawnProcess
}
