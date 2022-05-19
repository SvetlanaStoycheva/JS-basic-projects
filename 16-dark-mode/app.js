import { articles } from './data.js';

const toggleBtn = document.querySelector('.btn');
const sectionEl = document.querySelector('.articles');

toggleBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-theme');
});

sectionEl.innerHTML = articles
  .map((article) => {
    const { title, date, length, snippet } = article;
    //format date
    const formatDate = moment(date).format('MMMM Do, YYYY');
    return `
    <article class="post">
        <h2>${title}</h2>
        <div class="post-info">
          <span>${formatDate}</span>
          <span>${length}</span>
        </div>
        <p>
          ${snippet}
        </p>
      </article>
    `;
  })
  .join('');

console.log(moment);
