var spawn = require('child_process').spawn;
var py = spawn('python', ['../pyProjects/trivial/trivial.py']);

py.stdout.on('data', (data) => {
  console.log("got data from py: ", data.toString())
})

py.stdout.on('end', () => {
  console.log("py program ended!")
})
