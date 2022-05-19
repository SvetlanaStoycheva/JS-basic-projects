import people from './data.js';

const container = document.querySelector('.slide-container');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

container.innerHTML = people
  .map((person, index) => {
    //   console.table(person);
    const { img, name, job, text } = person;
    let position = 'next';
    if (index === 0) {
      position = 'active';
    } else if (index === people.length - 1) {
      position = 'last';
    }
    return `
  <article class="slide ${position}">
          <img
            class="img"
            src=${img}
            alt=${name}
          />
          <h4>${name}</h4>
          <p class=${job}>product designer</p>
          <p class=${text}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem sed
            a molestiae ipsam qui soluta non reprehenderit est officiis eum?
          </p>
          <div class="quote-icon">
            <div class="fas fa-quote-right"></div>
          </div>
        </article>
  `;
  })
  .join('');

// const slides = [...document.querySelectorAll('.slide')];
const startSlider = (type) => {
  const active = document.querySelector('.active');
  const last = document.querySelector('.last');
  let next = active.nextElementSibling;
  if (!next) {
    next = container.firstElementChild;
  }

  active.classList.remove('active');
  last.classList.remove('last');
  next.classList.remove('next');

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
  last.classList.add('naxt');
  next.classList.add('active');
};

nextBtn.addEventListener('click', () => {
  startSlider();
});
prevBtn.addEventListener('click', () => {
  startSlider('prev');
});
