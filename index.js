// Grab all elements
// Import modules
import Todo from './modules/todoObject.js';
import Storage from './modules/localStorage.js';
import UI, { array } from './modules/domObject.js';
import { dtNow } from './modules/dateTime.js';

const form = document.querySelector('[data-form]');
const contactForm = document.querySelector('.contact-form');
const showlist = document.querySelector('#lists-item');
const addList = document.querySelector('#lists-item-add');
const contact = document.querySelector('#lists-item-conatct');
const allAwesome = document.querySelector('.title');
const lists = document.querySelector('[data-lists]');
const bookTitle = document.querySelector('[title]');
const bookAuthor = document.querySelector('[author]');
const timeDate = document.querySelector('.date');

// Showing date and time
timeDate.innerHTML = `${dtNow}`;

let todoArr = Storage.getStorage();
const uiObject = new UI();

// form part
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (array !== todoArr) {
    todoArr = array;
  }
  const id = Math.random() * 1000000;
  const todo = new Todo(id, bookTitle.value, bookAuthor.value);
  todoArr = [...todoArr, todo];
  uiObject.todoArr = todoArr;
  uiObject.arrayChanger();
  uiObject.displayData();
  uiObject.colorChanger();
  uiObject.clearInput();
  // add to storage
  Storage.addTodStorage(todoArr);
});

// once the browser is loaded
window.addEventListener('DOMContentLoaded', () => {
  uiObject.todoArr = todoArr;
  if (todoArr.length === 0) {
    uiObject.displayNothing();
  } else {
    uiObject.displayData(todoArr);
  }
  uiObject.colorChanger();
  // remove from the dom
  uiObject.removeTodo();
});

// Add functionality to nav bar

showlist.addEventListener('click', () => {
  if (lists.classList.contains('hide')) {
    lists.classList.remove('hide');
    allAwesome.classList.remove('hide');
  }

  if (form.classList.contains('show')) {
    form.classList.remove('show');
  }

  if (contactForm.classList.contains('show')) {
    contactForm.classList.remove('show');
  }
});

addList.addEventListener('click', () => {
  if (!form.classList.contains('show')) {
    form.classList.add('show');
  }

  if (!lists.classList.contains('hide')) {
    lists.classList.add('hide');
    allAwesome.classList.add('hide');
  }

  if (contactForm.classList.contains('show')) {
    contactForm.classList.remove('show');
  }
});

contact.addEventListener('click', () => {
  if (!contactForm.classList.contains('show')) {
    contactForm.classList.add('show');
  }

  if (!lists.classList.contains('hide')) {
    lists.classList.add('hide');
    allAwesome.classList.add('hide');
  }

  if (form.classList.contains('show')) {
    form.classList.remove('show');
  }
});