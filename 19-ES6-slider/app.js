import people from './data.js';

const container = document.querySelector('.slide-container');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

container.innerHTML = people
  .map((p, index) => {
    const { name, job, text, img } = p;

    //we use three different classes: active, next and last, to position the slides
    let position = 'next';
    if (index === 0) {
      position = 'active';
    }
    if (index === people.length - 1) {
      position = 'last';
    }

    return `
  <article class="slide ${position}">
          <img
            src="${img}"
            alt="${name}"
            class="img"
          />
          <h4>${name}</h4>
          <p class="title">${job}</p>
          <p class="text">
            ${text}
          </p>
          <div class="quote-icon">
            <div class="fas fa-quote-right"></div>
          </div>
        </article>
  `;
  })
  .join('');

//Slider functionality
//select the current active, next and last slider, remove from them their current classes; because the slide article has miltiple clases, so it is an array, we need to use remove[]; add the new classes;
const startSlider = (type) => {
  const active = document.querySelector('.active');
  const last = document.querySelector('.last');
  let next = active.nextElementSibling;
  //when we reach the end of the array
  if (!next) {
    next = container.firstElementChild;
  }

  active.classList.remove(['active']);
  next.classList.remove(['next']);
  last.classList.remove(['last']);

  //when we click prev btn
  if (type === 'prev') {
    active.classList.add('next');
    last.classList.add('active');
    next = last.previousElementSibling;
    if (!next) {
      next = container.lastElementChild;
    }
    next.classList.remove('next');
    next.classList.add('last');
    return;
  }

  active.classList.add('last');
  next.classList.add('active');
  last.classList.add('next');
};

nextBtn.addEventListener('click', () => {
  startSlider();
});
prevBtn.addEventListener('click', () => {
  startSlider('prev');
});
