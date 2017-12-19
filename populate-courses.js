console.log("script running")

const wrapper = document.querySelector('.cardBody .row')
console.log(wrapper)

var preferences = {
  'location': [],
  'session': [],
  'course': []
}
var courses = []

fetch("https://raw.githubusercontent.com/jolson615/JSCalendar/master/schedule.json")
  .then(r => r.json())
  .then(data => {
    populatePage(data)
    courses = data
  }).catch(e => console.log("Error"))

function populatePage(courses) {
  courses.forEach(course => {
    addCard(course)
  })
}

function addCard(course) {
  let imagesrc = getImage(course["Class Code"])
  let startDate = new Date(course["Start Date"])
  let startDateString = startDate.getMonth() + "/" + startDate.getDate()
  let endDate = new Date(course["End Date"])
  let endDateString = endDate.getMonth() + "/" + endDate.getDate()
  console.log(startDate)
  if (startDate) {
    console.log("exists")
  } else {
    console.log("DNE")
  }
  wrapper.innerHTML += `
      <div class="col s12 m6 l4 coursecard" data-session='${course["Session"]}' data-location='${course["Area"]}' data-course='${course["Class"]}'>
        <div class="card teal darken-2">
          <div class="card-image" style="height: 175px; overflow: hidden">
            <img src='${imagesrc}'>
            <span class="card-title" style="font-weight: 900; text-shadow: 2px 2px 2px #000">${course["Class"]}</span>
          </div>
          <div class="card-content white-text">
            <span class="card-title">${course["Area"]}</span>
            <p>${course["Location"]}
            <br>${startDateString} - ${endDate.toLocaleDateString('en-US')}
            <br>We should write a brief course description here, no?
            </p>
          </div>
          <div class="card-action">
            <a href="https://www.upperlinecode.com/classes">Learn More</a>
            <a href='${course["Link"]}'>Register</a>
          </div>
        </div>
      </div>
  `
}

function getImage(courseName) {
  if (courseName == "ruby") {
    return("images/ruby.png")
  } else if (courseName == "swift") {
    return("images/ios.png")
  } else if (courseName == "javascript") {
    return("images/javascript.png")
  }
}
