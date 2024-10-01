const clock = document.getElementById("clock");

function startClock() {
  let begin = new Date();
  function update() {
    let date = new Date();
    let time = date.getTime() - begin.getTime();
    clock.value = Math.round(time / 1000);
    setTimeout(update, 1000);
  }

  update();
}

startClock();
