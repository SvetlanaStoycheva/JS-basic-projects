const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
// #F15025
const btn = document.querySelector('.btn')
const colorText = document.querySelector('.color')

btn.addEventListener('click', () => {
  let hexColor = '#'
  let shuffled = shuffledHex()
  for (let i = 0; i < 6; i++) {
    hexColor += shuffled[i]
  }
  //console.log(hexColor)
  document.body.style.background = hexColor
  colorText.textContent = hexColor
})
function shuffledHex() {
  const shuffled = hex
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
  return shuffled
}
