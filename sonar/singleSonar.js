var gpio = require('pi-gpio');
const trigger = 16
const echo = 18



let pulseInterval;
gpio.open(echo, "input", () => {
  pulseInterval = setInterval(() => {
    gpio.read(echo, (err, val) => {
      if (val) {
        console.log("got signal!")
      }
    })
  }, 1)
})

gpio.open(trigger, "output", () => {
  console.log("wait a second")
  setTimeout(() => {
    gpio.write(trigger, 0, () => {
      setTimeout(() => {
        console.log("fire signal for 1 second")
        gpio.write(trigger, 1, () => {
          setTimeout(() => {
            console.log("stop signal")
            gpio.write(trigger, 0, () => {
              console.log("stopped for 1 sec then close both")
              setTimeout(() => {
                clearInterval(pulseInterval)
                console.log("close both")
                gpio.close(trigger)
                gpio.close(echo)
              }, 1000)
            })
          }, 1)
        })
      }, 100)
    })

  }, 1000)
})
