// Wait until user stop typing and call fetchData (1s)
/*
  Deboucing an input
  Waiting for some time to pass after the last event
  to actually do something
*/
const debounce = (func, delay = 500) => {
  let timeoutId

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func.apply(null, args)
    }, delay)
  }
}

/*
let timeoutId
const onInputNormal = (event) => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  timeoutId = setTimeout(() => {
    fetchData(event.target.value)
  }, 1000)
}
*/
