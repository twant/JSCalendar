window.addEventListener('click', e => {
  if (e.target.classList.contains("option")) {
    e.target.classList.toggle("active")
    e.target.classList.toggle("strikethrough")
    remakeList()
  } else if (e.target.classList.contains("select")) {
    const options = {
      "location" : document.querySelectorAll(".option.location"),
      "date" : document.querySelectorAll(".option.date"),
      "content" : document.querySelectorAll(".option.content"),
      "age" : document.querySelectorAll(".option.age")
    }
    console.log(options)
    console.log(e.target.classList)
    let type = e.target.classList[2]
    let toggle = e.target.classList[1]
    if (toggle == "deselectall") {
      options[type].forEach( item => {
        item.classList.remove("active")
        item.classList.add("strikethrough")
      })
    } else if (toggle == "selectall") {
      options[type].forEach( item => {
        item.classList.add("active")
        item.classList.remove("strikethrough")
      })
    }
    remakeList()
  }
})

// function resizeWrapper() {
//   const body = document.querySelector(".cardBody")
//   const menu = document.querySelector("#menuBar")
//   const newOffset = menu.offsetHeight + 10
//   body.style.top = `${newOffset}px`;
// }
//
// document.addEventListener("mousemove", e => {
//   resizeWrapper()
// })

function remakeList() {
  const rows = document.querySelectorAll(".coursecard")
  const whoopsText = document.querySelector('#whoops')
  // console.log(rows)
  updatePreferences()
  var counter = 0
  rows.forEach(row => {
    // console.log(row)
    // console.log(preferences.age)
    // console.log(row.dataset)
    // console.log(row.dataset.location)
    // console.log(preferences.location)
    // console.log(preferences.location.includes(row.dataset.location))
    // console.log(preferences.course.includes(row.dataset.course))
    // console.log(preferences.session.includes(row.dataset.session))
    // console.log(preferences.age.includes(row.dataset.age))
    if (preferences.location.includes(row.dataset.location) && preferences.course.includes(row.dataset.course) && preferences.session.includes(row.dataset.session) && preferences.age.includes(row.dataset.age)) {
      row.classList.remove("hidden")
      counter += 1
    } else {
      row.classList.add("hidden")
    }
  })
  console.log(counter)
  if (counter == 0) {
    console.log("triggered")
    whoopsText.classList.remove("hidden")
  } else {
    whoopsText.classList.add("hidden")
  }
}

function resetAll() {
  const whoopsText = document.querySelector('#whoops')
  whoopsText.classList.add("hidden")
  const options = document.querySelectorAll(".option")
  options.forEach(option => {
    option.classList.add("active")
    option.classList.remove("strikethrough")
  })
  remakeList()
}

function updatePreferences() {
  preferences = {
    'location': [],
    'session': [],
    'course': [],
    'age': []
  }
  const options = document.querySelectorAll(".option")
  // console.log(options)
  options.forEach(chosenOption => {
    if (!chosenOption.classList.contains("strikethrough")) {
      preferences[chosenOption.dataset.type].push(chosenOption.dataset[chosenOption.dataset.type])
    }
  })

}
