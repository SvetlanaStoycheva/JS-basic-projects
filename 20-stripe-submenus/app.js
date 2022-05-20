import sublinks from './data.js';

const toggleBtn = document.querySelector('.toggle-btn');
const closeBtn = document.querySelector('.close-btn');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const sidebar = document.querySelector('.sidebar-links');
const linksBtns = [...document.querySelectorAll('.link-btn')];
const submenu = document.querySelector('.submenu');
const hero = document.querySelector('.hero');
const nav = document.querySelector('.nav');

//hide/show sidebar
toggleBtn.addEventListener('click', () => {
  sidebarWrapper.classList.add('show');
});
closeBtn.addEventListener('click', () => {
  sidebarWrapper.classList.remove('show');
});

//set sidebar
sidebar.innerHTML = sublinks
  .map((i) => {
    const { links, page } = i;
    return `
  <article>
      <h4>${page}</h4>
      <div class="sidebar-sublinks">
        ${links
          .map((l) => {
            return `
            <a href="${l.url}">
            <i class="${l.icon}"></i>${l.label}
            </a>
            `;
          })
          .join('')}
      </div>
    </article>
  `;
  })
  .join('');

//show the submenu when hovering over a nav button; submenu has specific position, bellow the button and in it's center;
linksBtns.map((l) => {
  l.addEventListener('mouseover', (e) => {
    const text = e.currentTarget.textContent;
    //we take the coordinates of e.currentTarget in order to position the corresponding submenu just bellow the button we are hovering over.
    const tempBtn = e.currentTarget.getBoundingClientRect();
    const buttonCenter = (tempBtn.left + tempBtn.right) / 2;
    const button = tempBtn.bottom - 3;

    //find the corresponding submenu for the hovered button
    const tempPage = sublinks.find(({ page }) => page === text);

    if (tempPage) {
      const { page, links } = tempPage;

      //show the submenus in correct position
      submenu.classList.add('show');
      submenu.style.left = `${buttonCenter}px`;
      submenu.style.top = `${button}px`;

      //change the number of submenu's columns according to the number of links
      let columns = 'col-2';
      if (links.length === 3) {
        columns = 'col-3';
      } else if (links.length > 3) {
        columns = 'col-4';
      }

      //
      submenu.innerHTML = `
      <section>
      <h4>${page}</h4>
      <div class="submenu-center ${columns}">
        ${links
          .map((l) => {
            return `
              <a href="${l.url}">
              <i class="${l.icon}"></i>${l.label}
              </a>`;
          })
          .join('')}
      </div>
    </section>
      `;
    }
  });
});

//hide the submenu when we hover outside the button
hero.addEventListener('mouseover', function (e) {
  submenu.classList.remove('show');
});

nav.addEventListener('mouseover', function (e) {
  if (!e.target.classList.contains('link-btn')) {
    submenu.classList.remove('show');
  }
});
