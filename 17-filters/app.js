import { products } from './products.js';

//we make a copy of products because when we have filtering we always need to go back to the original.
let filteredProducts = [...products];

const productsContainer = document.querySelector('.products-container');

const dispalyProducts = () => {
  if (filteredProducts.length > 0) {
    productsContainer.innerHTML = filteredProducts
      .map(({ id, title, image, price }) => {
        return `<article class='product' data-id=${id}>
          <img
            src='${image}'
            class='product-img img'
            alt='${title}'
          />
          <footer>
            <h5 class='product name'>${title}</h5>
            <span class='product-price'>$${price}</span>
          </footer>
        </article>`;
      })
      .join('');
  } else {
    productsContainer.innerHTML = `
        <h4>Sorry, no products matched your search</h4>
        `;
    return;
  }
};

dispalyProducts();

// filter the displayed products after serch input
const form = document.querySelector('.input-form');
const searchInput = document.querySelector('.search-input');

form.addEventListener('keyup', () => {
  const searchValue = searchInput.value;
  filteredProducts = products.filter((i) =>
    i.title.toLowerCase().includes(searchValue)
  );
  dispalyProducts();
  //when we go back to searchValue = '', filteredProducts contains all the products again  because when we use includes(''), it returns all products.
});

//set up the filter buttons dynamically
const buttonsContainer = document.querySelector('.companies');

const displayButtons = () => {
  let allButtons = products.map((p) => p.company);
  allButtons = ['all', ...new Set(allButtons)];

  buttonsContainer.innerHTML = allButtons
    .map((button) => {
      return `
    <button class="company-btn">${button}</button>
    `;
    })
    .join('');
};
displayButtons();

//display filtered products after filter button is clicked
const companyBtns = [...document.querySelectorAll('.company-btn')];

companyBtns.map((button) => {
  button.addEventListener('click', (e) => {
    // console.log(e.target.textContent);
    if (e.target.textContent === 'all') {
      filteredProducts = products;
    } else {
      filteredProducts = products.filter((p) => {
        return p.company === e.target.textContent;
      });
    }
    dispalyProducts();
  });
});

//display filtered products after filter button is clicked <= from the tutorial; eventListener is on the parent container, not on the buttons
// buttonsContainer.addEventListener('click', (e) => {
//   if (e.target.classList.contains('company-btn')) {
//     if (e.target.textContent === 'all') {
//       filteredProducts = [...products];
//     } else {
//       filteredProducts = products.filter((p) => {
//         return p.company === e.target.textContent;
//       });
//     }
//     //clear the search value
//     searchInput.value = '';
//   }
//   dispalyProducts();
// });
