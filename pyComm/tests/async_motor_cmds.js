var spawn = require('child_process').spawn;
var py = spawn('python',
  ['../pyProjects/trivial/async_input_to_motor.py'],
  {
    uid: 0
  });

py.stdout.on('data', (data) => {
  console.log("got data from py: ", data.toString())
})

py.on('exit', (code) => {
  console.log("py program exited with code!", code)
})

console.log("sending first back cmd")
py.stdin.write('b\n')
// py.stdin.end()

setTimeout(() => {
  console.log("sending second back cmd")
  py.stdin.write('b\n')

  setTimeout(() => {
    py.stdin.write('f\n')
    console.log("ending stdin")
    setTimeout(() => {
      py.stdin.end()
    }, 3000)
  }, 3000)
}, 5000)


