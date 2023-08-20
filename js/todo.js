const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";
const savedToDos = localStorage.getItem(TODOS_KEY);

let toDos = [];

const saveToDos = function () {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
};

const paintToDo = function (newToDo) {
  const li = document.createElement("li");
  li.id = newToDo.id;
  const span = document.createElement("span");
  const button = document.createElement("button");

  const deleteToDo = function (event) {
    const li = event.composedPath()[1];
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== Number(li.id));
    saveToDos();
  };

  button.addEventListener("click", deleteToDo);
  button.innerText = "X";
  span.innerText = newToDo.text;

  toDoList.appendChild(li);
  li.appendChild(span);
  li.appendChild(button);
};

const handleTodoSubmit = function (event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newToDo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
};

toDoForm.addEventListener("submit", handleTodoSubmit);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
