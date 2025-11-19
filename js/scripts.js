const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const toolbar = document.querySelector("#toolbar");
const filterInput = document.querySelector("#filter-input");
const searchInput = document.querySelector("#search-input");
const eraseSearchInputBtn = document.querySelector("#search-todo button");

let oldInputValue;

// Funções

const saveTodo = (value) => {
  const todoTitle = value.trim();

  const div = document.createElement("div");
  div.classList.add("todo");

  const h3 = document.createElement("h3");
  h3.innerText = todoTitle;
  div.appendChild(h3);

  const finishBtn = document.createElement("button");
  finishBtn.classList.add("finish-todo");
  finishBtn.innerHTML = `<svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
            >
              <path
                fill="000"
                d="M18 6h2v2h-2zm-2 4V8h2v2zm-2 2v-2h2v2zm-2 2h2v-2h-2zm-2 2h2v-2h-2zm-2 0v2h2v-2zm-2-2h2v2H6zm0 0H4v-2h2z"
              />
            </svg>`;
  div.appendChild(finishBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = `<svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18 2h-2v2h-2v2h-2v2h-2v2H8v2H6v2H4v2H2v6h6v-2h2v-2h2v-2h2v-2h2v-2h2v-2h2V8h2V6h-2V4h-2zm0 8h-2v2h-2v2h-2v2h-2v2H8v-2H6v-2h2v-2h2v-2h2V8h2V6h2v2h2zM6 16H4v4h4v-2H6z"
              />
            </svg>`;
  div.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-todo");
  deleteBtn.innerHTML = `<svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
            >
              <path
                fill="000"
                d="M21 5H7v2H5v2H3v2H1v2h2v2h2v2h2v2h16V5zM7 17v-2H5v-2H3v-2h2V9h2V7h14v10zm8-6h-2V9h-2v2h2v2h-2v2h2v-2h2v2h2v-2h-2zm0 0V9h2v2z"
              />
            </svg>`;
  div.appendChild(deleteBtn);

  todoList.appendChild(div);

  todoInput.value = "";
  todoInput.focus();

  const filterValue = filterInput.value;
  filterTodos(filterValue);
};

const toggleEditForm = () => {
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
  editForm.classList.toggle("hide");
  toolbar.classList.toggle("hide");
};

const editTodo = (value) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    const todoText = todo.querySelector("h3");
    if (todoText.innerText === oldInputValue) {
      todoText.innerText = value;
    }
  });
};

const filterTodos = (value) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    todo.style.display = "flex";
    todo.classList.remove("hidden");

    switch (value) {
      case "done":
        if (!todo.classList.contains("done")) {
          todo.style.display = "none";
          todo.classList.add("hidden");
        }
        break;
      case "todo":
        if (todo.classList.contains("done")) {
          todo.style.display = "none";
          todo.classList.add("hidden");
        }
        break;
      case "all":
        todo.style.display = "flex";
        todo.classList.remove("hidden");
        break;
    }
  });
};

const searchTodo = (value) => {
  const todos = document.querySelectorAll(".todo");
  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

    if (!todo.classList.contains("hidden")) todo.style.display = "flex";

    if (!todoTitle.includes(value)) {
      //&& !todo.classList.contains("hidden") DANDO ERRO AQUI
      todo.style.display = "none";
    }
  });
};

// Eventos

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const target = e.target;
  const todo = target.closest("div");
  let todoTitle;

  if (todo && todo.querySelector("h3")) {
    todoTitle = todo.querySelector("h3").innerText;
  }

  if (target.classList.contains("finish-todo")) {
    todo.classList.toggle("done");
  } else if (target.classList.contains("edit-todo")) {
    toggleEditForm();
    editInput.value = oldInputValue = todoTitle;
    editInput.focus();
  } else if (target.classList.contains("delete-todo")) {
    todo.remove();
  }

  const filterValue = filterInput.value;
  filterTodos(filterValue);
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = editInput.value.trim();

  if (!value) {
    return;
  }

  editTodo(value);
  toggleEditForm();
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleEditForm();
});

filterInput.addEventListener("change", (e) => {
  const filterValue = filterInput.value;

  filterTodos(filterValue);
});

searchInput.addEventListener("keyup", () => {
  const currentSearch = searchInput.value.toLowerCase();

  searchTodo(currentSearch);
});

eraseSearchInputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.value = "";
});
