// select modal-btn,modal-overlay,close-btn
// listen for click events on modal-btn and close-btn
// when user clicks modal-btn add .open-modal to modal-overlay
// when user clicks close-btn remove .open-modal from modal-overlay

const modalOpenBtn = document.querySelector('.modal-btn')
const modal = document.querySelector('.modal-overlay')
const closeModalBtn = document.querySelector('.close-btn')

modalOpenBtn.addEventListener('click', () => {
  modal.classList.add('open-modal')
})
closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('open-modal')
})
