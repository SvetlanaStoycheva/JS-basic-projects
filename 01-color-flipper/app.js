const colors = ['green', 'red', 'rgba(133,122,200)', '#f15025']

const btn = document.querySelector('.btn')
const colorText = document.querySelector('.color')
// Rotate the colors
// let counter = -1
// btn.addEventListener('click', function () {
//   if (counter >= colors.length - 1) {
//     counter = 0
//   } else {
//     counter += 1
//   }
//   document.body.style.background = colors[counter]
// })

// Use random color
btn.addEventListener('click', () => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  //   console.log(randomColor)

  document.body.style.background = randomColor
  colorText.textContent = randomColor
})
