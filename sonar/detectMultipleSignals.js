var gpio = require('pi-gpio');
const trigger = 16
const echo = 18



let catchInterval, fireInterval;
let fired, catched, hasReceived;
const msMultiplier = 34300 / 1000 /2
gpio.open(echo, "input", () => {
  catchInterval = setInterval(() => {
    gpio.read(echo, (err, val) => {
      if (val && !hasReceived) {
        hasReceived = true
        catched = new Date().getMilliseconds();
        let distance = (catched - fired) * msMultiplier;
        console.log("got signal after ", distance)
      }
    })
  }, 1)
})

gpio.open(trigger, "output", () => {

  // Send trigger every 1,5s
  fireInterval = setInterval(() => {
    gpio.write(trigger, 0, () => {
      setTimeout(() => {
        hasReceived = false;
        fired = new Date().getMilliseconds();
        gpio.write(trigger, 1, () => {
          gpio.write(trigger, 0, () => {
          })
        })
      }, 50)
    })
  }, 200)
})

setTimeout(() => {
  console.log("Closed all intervals after 15seconds")
  clearInterval(catchInterval)
  clearInterval(fireInterval)
  console.log("close both pins")
  gpio.close(trigger)
  gpio.close(echo)
}, 5000)
