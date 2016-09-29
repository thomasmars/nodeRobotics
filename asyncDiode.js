var gpio = require('pi-gpio');

const diode = 18

gpio.open(diode, "output", () => {
  console.log("turn on diode")

  var interval = setInterval(() => {
    gpio.read(diode, (err, val) => {
      console.log("read diode", val)
    })
  }, 40)

  gpio.write(diode, 1, () => {

    setTimeout(() => {
      console.log("1 sec passed, close")

      gpio.write(diode, 0, () => {
        console.log("turned off diode")

        setTimeout(() => {
          gpio.write(diode, 1 ,() => {
            console.log("turned on again")

            setTimeout( () => {
              console.log("final close")
              clearInterval(interval);
              gpio.close(diode)
            }, 1000)

          })

        }, 1000)
      })
    }, 1000)

  })

})
