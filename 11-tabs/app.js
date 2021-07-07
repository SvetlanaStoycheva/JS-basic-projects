const btns = document.querySelectorAll('.tab-btn ')
const infos = document.querySelectorAll('.content')
const about = document.querySelector('.about')

about.addEventListener('click', (e) => {
  const id = e.target.dataset.id
  if (e.target.classList.contains('tab-btn')) {
    btns.forEach((btn) => {
      btn.classList.remove('active')
    })
    e.target.classList.add('active')
  }
  infos.forEach((info) => {
    if (id === info.id) {
      info.classList.add('active')
    } else {
      info.classList.remove('active')
    }
  })
})
