// select items
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

//
let editElement;
let editFlag = false;
let editId = '';

//Event Listeners
form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearList);
window.addEventListener('DOMContentLoaded', setupItems);

// functions
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString(); //get unique id-s

  if (value && !editFlag) {
    //if we have a value and we are not editing => create an element and appand it to the list
    createListItem(id, value);
    displayAlert('item added to the list', 'success');
    container.classList.add('show-container');
    // add to locale storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    //set the changed title from the form to the list
    editElement.textContent = value;
    displayAlert('value edited', 'success');
    editLocalStorage(editId, value);
    setBackToDefault();
  } else {
    displayAlert('Please enter value', 'danger');
  }
}
// display / remove alert
function displayAlert(text, action) {
  alert.textContent = `${text}`;
  alert.classList.add(`alert-${action}`);

  setTimeout(() => {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

function setBackToDefault() {
  grocery.value = '';
  editFlag = false;
  editId = '';
  submitBtn.textContent = 'submit';
}
function clearList() {
  list.innerHTML = '';
  container.classList.remove('show-container');
  displayAlert('empty list', 'danger');
  localStorage.removeItem('list');
  setBackToDefault();
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    clearList();
  }
  removeFromLocalStorage(id);
}
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = element.querySelector('.item');
  grocery.value = editElement.textContent;
  submitBtn.textContent = 'edit';
  editFlag = true;
  editId = element.dataset.id;
}
// localStorage
// getItem, setItem, removeItem, save as strin
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem('list', JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter((item) => item.id !== id);
  localStorage.setItem('list', JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list'))
    : [];
}
// Setup Items from localStorage on page load
function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value);
    });
    container.classList.add('show-container');
  }
}

function createListItem(id, value) {
  const element = document.createElement('article');
  element.classList.add('grocery-item');
  const attr = document.createAttribute('data-id');
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `<p class="item">${value}</p>
            <div class="btn-container">
              <button class="edit-btn" type="button">
                <i class="fas fa-edit"></i>
              </button>
              <button class="delete-btn" type="button">
                <i class="fas fa-trash"></i>
              </button>
            </div>
    `;
  //select delete and edit btns here because here we have acccess to them. At the beginning when the app loads we don't.
  const deleteBtn = element.querySelector('.delete-btn');
  const editBtn = element.querySelector('.edit-btn');
  deleteBtn.addEventListener('click', deleteItem);
  editBtn.addEventListener('click', editItem);

  list.appendChild(element);
}
