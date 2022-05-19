import fetchFollowers from './fetchFollowers.js';
import displayFollowers from './displayFollowers.js';
import paginate from './paginate.js';
import displayButtons from './displayButtons.js';

const title = document.querySelector('.section-title h1');
const btnContainer = document.querySelector('.btn-container');

let index = 0;
let pages = [];

const setupUI = () => {
  displayFollowers(pages[index]);
  displayButtons(btnContainer, pages, index);
};

const init = async () => {
  const followers = await fetchFollowers();

  if (followers) {
    title.textContent = 'Pagination';
  }
  pages = paginate(followers);
  setupUI();
};

btnContainer.addEventListener('click', function (e) {
  //   console.log(e.target);
  if (e.target.classList.contains('btn-container')) return;
  if (e.target.classList.contains('page-btn')) {
    // console.log(e.target.dataset.index);
    index = Number(e.target.dataset.index);
  } else if (e.target.classList.contains('prev-btn')) {
    index = Number(index - 1);
    if (index < 0) {
      index = pages.length - 1;
    }
  } else if (e.target.classList.contains('next-btn')) {
    index = Number(index + 1);
    if (index > pages.length - 1) {
      index = 0;
    }
  }
  setupUI();
});

window.addEventListener('load', init);
