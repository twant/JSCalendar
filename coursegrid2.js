console.log("script running")

const wrapper = document.querySelector('#wrapperGrid')
console.log(wrapper)

const siteboxes = document.querySelectorAll('.sitebox')
console.log(siteboxes)

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
  let agegroup = ""
  if (course["Min Age"] == "11") {
    agegroup = `<h6 class="agegroup">*Middle School</h6>`
  }
  siteboxes.forEach(sitebox => {
    console.log(sitebox.dataset.site)
    console.log(site)
    console.log(sitebox.dataset.site == site)
    if (sitebox.dataset.site == site) {
      sitebox.innerHTML += `
        <div class="course ${classname} s${session} ${site}">
          <h3 class="coursename">${classname}</h3>
          <h4 class="coursedate">${start} - ${end}</h4>
          ${agegroup}
        </div>
      `
    }
    // } else {
    //
    // }
    // wrapper.innerHTML += `
    //   <div class="course ${classname} s${session} ${site}">
    //     <h3 class="coursename">${classname}</h3>
    //     <h4 class="coursedate">${start} - ${end}</h4>
    //   </div>
    // `
  })
}
