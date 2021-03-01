(function() {
  'use strict'
  console.clear()

  const elButton = document.querySelector('button')
  const times = loadLocalstorage() || []

  console.log(times)

  elButton.addEventListener('click', event => {
    const timestamp = +new Date()
    const id = generateId()
    const currentDuration = times.find(duration => duration.id === id)

    if(currentDuration) {
      currentDuration.durations.push(timestamp)
    }

    else {
      const time = {
        id,
        durations: [timestamp]
      }

      times.push(time)
    }

    updateLocalstorage()
  })

  function updateLocalstorage() {
    localStorage.setItem('times', JSON.stringify(times))
  }

  function loadLocalstorage() {
    return JSON.parse(localStorage.getItem('times'))
  }

  function generateId() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${year}${month}${day}`
  }
})()
