var spawn = require('child_process').spawn;
var py = spawn('python',
  ['../pyProjects/trivial/multiple_input.py'],
  {
    uid: 0
  });

py.stdout.on('data', (data) => {
  console.log("got data from py: ", data.toString())
})

py.on('exit', (code) => {
  console.log("py program exited with code!", code)
})

py.stdin.write('loop\n')
// py.stdin.end()

setTimeout(() => {
  py.stdin.write('test\n')
  py.stdin.end()
}, 2000)
