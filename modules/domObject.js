import Storage from './localStorage.js';

// grab all elements
export const lists = document.querySelector('[data-lists]');
export const bookTitle = document.querySelector('[title]');
export const bookAuthor = document.querySelector('[author]');

// empty array
export let array; // eslint-disable-line

// display the todo in the DOM;
export default class UI {
  constructor(todoArr = Storage.getStorage()) {
    this.todoArr = todoArr;
    array = todoArr;
  }

  arrayChanger() {
    if (this.todoArr !== array) {
      array = this.todoArr;
    }
  }

  displayData(todoArr = this.todoArr) {
    const displayData = todoArr.map((item) => `
            <div class="todo">
            <div>
            <span>"${item.title}" by</span>
            <span> ${item.author}</span>
            </div>
            <button class="remove" data-id = ${item.id}>Remove</button>
            </div>
            `);
    lists.innerHTML = (displayData).join(' ');
  }

  displayNothing = () => {
    const displayData = '<h3 class="display-nothing">You have no book to show</h2>';
    lists.innerHTML = displayData;
  }

  colorChanger = () => {
    const todos = document.querySelectorAll('.todo');
    let count = 1;
    todos.forEach((item) => {
      if (count % 2 !== 0) {
        item.classList.add('active');
      } else if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
      count += 1;
    });
  }

  clearInput = () => {
    bookTitle.value = '';
    bookAuthor.value = '';
  }

  removeTodo() {
    lists.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove')) {
        e.target.parentElement.remove();
        const btnId = e.target.dataset.id;
        // remove from array.
        array = this.removeArrayTodo(btnId);
      }
      return array;
    });
  }

  removeArrayTodo(id) {
    const newArray = this.todoArr.filter((item) => item.id !== +id);
    this.todoArr = newArray;
    Storage.addTodStorage(this.todoArr);
    if (this.todoArr.length === 0) {
      this.displayNothing();
    }
    this.colorChanger();
    return this.todoArr;
  }
}