const decreaseBtn = document.querySelector('.decrease')
const increaseBtn = document.querySelector('.increase')
const resetBtn = document.querySelector('.reset')
const value = document.querySelector('#value')

decreaseBtn.addEventListener('click', () => {
  const newValue = Number(value.textContent) - 1
  value.textContent = newValue
  colorValue(newValue)
})
increaseBtn.addEventListener('click', () => {
  const newValue = Number(value.textContent) + 1
  value.textContent = newValue
  colorValue(newValue)
})
resetBtn.addEventListener('click', () => {
  const newValue = 0
  value.textContent = newValue
  colorValue(newValue)
})

function colorValue(num) {
  if (num < 0) {
    value.style.color = 'red'
  } else if (num > 0) {
    value.style.color = 'green'
  } else {
    value.style.color = 'black'
  }
}
