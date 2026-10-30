import './style.css'

// Structure of the data schema
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let todos: Todo[] = [];

const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;

// Function to update the progress bar (Option 10)
const updateProgress = (): void => {
  const progressBar = document.getElementById('progress-bar') as HTMLProgressElement;
  const progressText = document.getElementById('progress-text') as HTMLParagraphElement;
  
  if (!progressBar || !progressText) return;

  if (todos.length === 0) {
    progressBar.value = 0;
    progressText.innerText = '0% completed';
    return;
  }

  const completedCount = todos.filter(t => t.completed).length;
  const percentage = Math.round((completedCount / todos.length) * 100);

  progressBar.value = percentage;
  progressText.innerText = `${percentage}% completed (${completedCount}/${todos.length})`;
};

// Function to render the list (includes checkboxes, text, Remove, and Edit buttons)
const renderTodos = (): void => {
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    // Render checkbox, text with strike-through style, Remove and Edit buttons
    li.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <input type="checkbox" class="toggle-checkbox" ${todo.completed ? 'checked' : ''} />
        <span style="${todo.completed ? 'text-decoration: line-through; color: gray;' : ''}">${todo.text}</span>
      </div>
      <div>
        <button class="remove-btn">Remove</button>
        <button id="editBtn">Edit</button>
      </div>
    `;

    // Event listener for the checkbox (Option 1)
    const checkbox = li.querySelector('.toggle-checkbox') as HTMLInputElement;
    checkbox?.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      renderTodos();
    });

    addRemoveButtonListener(li, todo.id);
    addEditButtonListener(li, todo.id);
    todoList.appendChild(li);
  });

  updateProgress();
};

// Add a new todo item
const addToDo = (text: string): void => {
  const newToDO: Todo = {
    id: Date.now(),
    text: text,
    completed: false
  };
  todos.push(newToDO);
  renderTodos();
};

renderTodos();

// Form submit event listener
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (text !== '') {
    addToDo(text);
    todoInput.value = ''; // Clears input field after adding
  }
});

// Listener and function for removing a todo
const addRemoveButtonListener = (li: HTMLElement, id: number): void => {
  const removeButton = li.querySelector('.remove-btn') as HTMLButtonElement;
  removeButton?.addEventListener('click', () => removeTodo(id));
};

const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
};

// Listener and function for editing a todo
const addEditButtonListener = (li: HTMLElement, id: number): void => {
  const editButton = li.querySelector('#editBtn') as HTMLButtonElement;
  editButton?.addEventListener('click', () => editTodo(id));
};

const editTodo = (id: number): void => {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    const newText = prompt('Edit todo', todo.text);
    if (newText !== null && newText.trim() !== '') {
      todo.text = newText.trim();
      renderTodos();
    }
  }
};