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
  console.log(todo_value);
  let todo_key = Math.random();
  localStorage.setItem(todo_key, todo_value);
  todo.value = "";
  location.reload();
}

for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  let todo_list_item = localStorage.getItem(key);

  let todoText = document.createTextNode(todo_list_item);
  let xButton = document.createElement("button");
  let xText = document.createTextNode("X");
  xButton.classList.add("delete_todo");
  xButton.setAttribute("id", i);
  xButton.appendChild(xText);

  let list = document.createElement("li");
  list.setAttribute("id", key);
  list.appendChild(todoText);
  list.appendChild(xButton);
  // list.innerHTML = todo_list_item;
  document.getElementById("todo_list").appendChild(list);
}

function removeTodo(j) {
  let todo_id = document.getElementById(j).parentElement.id;
  localStorage.removeItem(todo_id);
  location.reload();
}

for (let j = 0; j < localStorage.length; j++) {
  document.getElementById(j).addEventListener("click", () => {
    removeTodo(j);
  });
}
