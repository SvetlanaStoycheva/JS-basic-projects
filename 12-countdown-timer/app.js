const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const giveaway = document.querySelector('.giveaway')
const deadline = document.querySelector('.deadline')
const items = document.querySelectorAll('.deadline-format h4')

// if we need the current date: const currentDate = new Date()
// set the exparition date to be always after 10 days, so we can always see working counter
const tempDate = new Date()
let tempYear = tempDate.getFullYear()
let tempMonth = tempDate.getMonth()
let tempDay = tempDate.getDate()

// let futureDate = new Date(2022, 4, 25, 8, 30, 0) //the hardcoded version
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 8, 30, 0)

const year = futureDate.getFullYear()
const hours = futureDate.getHours()
const minutes = futureDate.getMinutes()
// months can not be directlly accessed in JS. That is way we need month array
// in new Date month in 0 index based. For May we need to put 4
let month = futureDate.getMonth()
month = months[month]
const date = futureDate.getDate()
let weekday = futureDate.getDay()

weekday = weekdays[weekday]

giveaway.textContent = `giveaway ends on ${weekday}, ${month} ${year} ${hours}:${minutes}am `

// future time in ms
const futureTime = futureDate.getTime()
function getRemainingTime() {
  const currentTime = new Date().getTime()
  const t = futureTime - currentTime
  // 1s = 1000ms, 1m = 60s, 1hr = 60min, 1d = 24hr
  // values in ms
  const oneDay = 24 * 60 * 60 * 1000
  const oneHour = 60 * 60 * 1000
  const oneMin = 60 * 1000

  let days = Math.floor(t / oneDay)
  let hours = Math.floor((t % oneDay) / oneHour)
  let minutes = Math.floor((t % oneHour) / oneMin)
  let seconds = Math.floor((t % oneMin) / 1000)

  const values = [days, hours, minutes, seconds]

  function formatValues(value) {
    if (value < 10) {
      return `0${value}`
    } else {
      return value
    }
  }
  items.forEach((item, index) => {
    item.textContent = formatValues(values[index])
  })
  if (t < 0) {
    clearInterval(countdown)
    deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired</h4>`
  }
}
// countdown
let countdown = setInterval(getRemainingTime, 1000)

getRemainingTime()
