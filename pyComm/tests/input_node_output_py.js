const readline = require('readline')
const spawn = require('child_process').spawn;
const py = spawn('python',
  ['../pyProjects/trivial/async_input_to_motor.py'],
  {
    uid: 0
  })
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

py.stdout.on('data', (data) => {
  console.log("got data from py: ", data.toString())
})

py.on('exit', (code) => {
  console.log("py program exited with code!", code)
})

const readyForCommand = () => {
  rl.question('Command ? (f,fr,fl,b,br,bl,exit', (answer) => {
    py.stdin.write(answer + '\n')

    if (answer === 'exit') {
      py.stdin.end()
    }
    else {
      readyForCommand()
    }
  })
}

readyForCommand()
