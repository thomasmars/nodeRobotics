var spawn = require('child_process').spawn;
var py = spawn('python',
  ['../pyProjects/trivial/input_from_node.py', 'b'],
  {
    uid: 0
  });

py.stdout.on('data', (data) => {
  console.log("got data from py: ", data.toString())
})

py.on('exit', (code) => {
  console.log("py program exited with code!", code)
})
