// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const grocery = document.getElementById('grocery')
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.clear-btn')

// edit option
let editElement
let editFlag = false
let editId = ''
// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItem)
clearBtn.addEventListener('click', clearList)

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault()
  const value = grocery.value
  const id = new Date().getTime().toString() //get unique id-s

  if (value && !editFlag) {
    const element = document.createElement('article')
    element.classList.add('grocery-item')
    const attr = document.createAttribute('data-id')
    attr.value = id
    element.setAttributeNode(attr)
    element.innerHTML = `<p class="item">${value}</p>
            <div class="btn-container">
              <button class="edit-btn" type="button">
                <i class="fas fa-edit"></i>
              </button>
              <button class="delete-btn" type="button">
                <i class="fas fa-trash"></i>
              </button>
            </div>
    `
    const deleteBtn = element.querySelector('.delete-btn')
    const editBtn = element.querySelector('.edit-btn')
    deleteBtn.addEventListener('click', deleteItem)
    editBtn.addEventListener('click', editItem)

    list.appendChild(element)
    displayAlert('item added to the list', 'success')
    container.classList.add('show-container')
    // add to locale storage
    addToLocalStorage(id, value)
    // set back to default
    setBackToDefault()
  } else if (value && editFlag) {
    editElement.textContent = value
    displayAlert('value edited', 'success')
    editLocalStorage(editId, value)
    setBackToDefault()
  } else {
    displayAlert('Please enter value', 'danger')
  }
}
// display / remove alert
function displayAlert(text, action) {
  alert.textContent = `${text}`
  alert.classList.add(`alert-${action}`)

  setTimeout(() => {
    alert.textContent = ''
    alert.classList.remove(`alert-${action}`)
  }, 1000)
}

function setBackToDefault() {
  grocery.value = ''
  editFlag = false
  editId = ''
  submitBtn.textContent = 'submit'
}
function clearList() {
  list.innerHTML = ''
  container.classList.remove('show-container')
  displayAlert('empty list', 'danger')
  setBackToDefault()
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement
  const id = element.dataset.id
  list.removeChild(element)
  if (list.children.length === 0) {
    clearList()
  }
  removeFromLocalStorage(id)
}
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement
  editElement = element.querySelector('.item')
  grocery.value = editElement.textContent
  submitBtn.textContent = 'edit'
  editFlag = true
  editId = element.dataset.id
}
// ****** LOCAL STORAGE **********
// getItem, setItem, removeItem, save as string
localStorage.setItem(
  'tesla',
  JSON.stringify(['modelS', 'modelY', 'CyberTruck'])
)
const tesla = JSON.parse(localStorage.getItem('tesla'))
localStorage.removeItem('tesla')
//////

function addToLocalStorage(id, value) {
  localStorage.setItem(
    'items',
    JSON.stringify([{ item_id: id, item_value: value }])
  )
}

function removeFromLocalStorage(id) {}
function editLocalStorage(id, value) {}
// ****** SETUP ITEMS **********
