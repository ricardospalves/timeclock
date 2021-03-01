(function() {
  'use strict'
  console.clear()

  const elButton = document.querySelector('button')
  const times = loadLocalstorage() || []

  changeButtonText()

  elButton.addEventListener('click', event => {
    const timestamp = +new Date()
    const id = generateId()
    const currentTime = getCurrentTime()

    if(currentTime) {
      currentTime.durations.push(timestamp)
    }

    else {
      const time = {
        id,
        durations: [timestamp]
      }

      times.push(time)
    }

    updateLocalstorage()
    changeButtonText()
  })

  function changeButtonText() {
    const currentTime = getCurrentTime()
    const texts = ['Entrada', 'Saída']

    if(currentTime) {
      elButton.textContent = texts[currentTime.durations?.length % 2]
    }

    else {
      elButton.textContent = texts[0]
    }
  }

  function getCurrentTime() {
    const id = generateId()
    const currentTime = times.find(duration => duration.id === id)

    return currentTime
  }

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
