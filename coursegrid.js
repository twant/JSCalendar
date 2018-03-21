console.log("script running")

const wrapper = document.querySelector('#wrapperGrid')
console.log(wrapper)

let courses = []

fetch("https://raw.githubusercontent.com/jolson615/JSCalendar/master/schedule.json")
  .then(r => r.json())
  .then(data => {
    console.log(data)
    courses = data
    makeGrid()
  }).catch(e => console.log("Error"))

function makeGrid() {
  courses.forEach(course => {
    addCell(course)
  })
}

function addCell(course) {
  let start = course["Start Date"].slice(6).replace("-","/")
  let end = course["End Date"].slice(6).replace("-","/")
  let classname = course["Class Code"]
  let session = course["Session"]
  let site = course["Site"]
  wrapper.innerHTML += `
  <div class="course ${classname} s${session} ${site}">
    <h3 class="coursename">${classname}</h3>
    <h4 class="coursedate">${start} - ${end}</h4>
  </div>
  `
}
