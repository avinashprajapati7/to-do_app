if ("serviceWorker" in navigator) {
  // register service worker
  navigator.serviceWorker.register("service-worker.js");
}

if (localStorage.length === 0) {
  document.getElementById("empty_notes").classList.remove("no_empty_notes");
  document.getElementById("empty_notes").classList.add("empty_notes");
}

function addTodo() {
  let todo = document.getElementById("todo_input");
  let todo_value = todo.value;
  if (todo.value.trim().length === 0) {
    document.getElementById("error_msg").classList.remove("error_hide");
    document.getElementById("error_msg").classList.add("error");
    return;
  }

  let todo_key = Date.now();
  localStorage.setItem(todo_key, todo_value);
  todo.value = "";
  location.reload();
}

// Create an array to store keys and sort them
let keysArray = [];
for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  keysArray.push(key);
}

keysArray.sort();

// Display todo items in order
for (let i = 0; i < keysArray.length; i++) {
  let key = keysArray[i];
  let todo_list_item = localStorage.getItem(key);

  let todoText = document.createTextNode(todo_list_item);
  let xButton = document.createElement("button");
  let xText = document.createTextNode("X");
  xButton.classList.add("delete_todo");
  xButton.setAttribute("id", key);
  xButton.appendChild(xText);

  let list = document.createElement("li");
  list.setAttribute("id", key);
  list.appendChild(todoText);
  list.appendChild(xButton);
  document.getElementById("todo_list").appendChild(list);
}

function removeTodo(event) {
  let todo_id = event.target.parentElement.id;
  localStorage.removeItem(todo_id);
  location.reload();
}

for (let j = 0; j < keysArray.length; j++) {
  let key = keysArray[j];
  document.getElementById(key).lastChild.addEventListener("click", removeTodo);
}

