function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector("[data-start]"),
  stopBtn: document.querySelector("[data-stop]"),
  bodyRef: document.querySelector("body")
}

refs.startBtn.addEventListener("click", changeBgrColor)
refs.stopBtn.addEventListener("click", stopColorChanging)

let timerId = null

function changeBgrColor() {
  timerId = setInterval(() => {
    refs.bodyRef.style.background = getRandomHexColor()
    refs.startBtn.disabled = true
  }, 1000)
}

function stopColorChanging() {
  clearInterval(timerId)
  refs.startBtn.disabled = false
}

