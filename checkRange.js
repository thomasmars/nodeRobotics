var gpio = require('pi-gpio');
const trigger = 16
const echo = 18
let pulseDuration = 0;
gpio.open(trigger, "output", () => {
  gpio.open(echo, "input", () => {
    gpio.write(trigger, 0, () => {
      console.log("set trigg to 0");
      console.log("waiting 0.5 sec");
      setTimeout(() => {
        console.log("done waiting");

        console.log("start listening async")
        setTimeout(() => {
          let gotSignal = false;
          let echoClosed = false;
          let iterations = 0;
          const maxIterations = 1000
          while (!gotSignal && iterations < maxIterations) {
            setTimeout(() => {
              gpio.read(echo, (err, val) => {
                console.log("val is", val)
                if (val) {
                  console.log("GOT SIGNAL!!!!!!");
                  gotSignal = true;
                }

                if (!echoClosed && (val || gotSignal || iterations === maxIterations)) {
                  echoClosed = true;
                  gpio.close(echo, () => {
                    console.log("closed echo");
                  })
                }
              })
            }, 0)
            iterations += 1
          }
          console.log("done iterating...")
          gotSignal = true;
        }, 0)

        console.log("setting trigg to 1 async");
        setTimeout(() => {
          console.log("actually setting trigger")
          gpio.write(trigger, 1, () => {
            setTimeout(() => {
              console.log("turning trigg off");
              gpio.write(trigger, 0, () => {
                console.log("closing trigger")
                gpio.close(trigger, () => {
                  console.log("closed trigger")
                })
              })
            }, 20)

          })
        }, 10)

      }, 500)
    })
  })


})


console.log("done with gpio...");
