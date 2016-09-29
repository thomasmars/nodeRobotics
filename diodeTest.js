var gpio = require('pi-gpio');

const diode = 18

gpio.open(diode, "output", () => {
  console.log("turn on diode")
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
              gpio.close(diode)
            }, 1000)

          })

        }, 1000)
      })
    }, 1000)

  })

})
