const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const tasksContainer = document.querySelector(".tasks-container");

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  // Validate input
  const inputIsValid = validateInput();

  // Validate input
  if (!inputIsValid) {
    return inputElement.classList.add("error");
  } else {
    addTaskAlert();
  }

  // Create elements
  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");
  taskContent.innerText = inputElement.value;
  taskContent.addEventListener("click", () => handleClick(taskContent));

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("far", "fa-trash-alt");

  deleteItem.addEventListener("click", () =>
    handleDeleteClick(taskItemContainer, taskContent)
  );

  // Append
  tasksContainer.appendChild(taskItemContainer);
  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);

  // Clear input
  inputElement.value = "";

  // Update local storage
  updateLocalStorage();
};

const handleClick = (taskContent) => {
  // Get all tasks
  const tasks = tasksContainer.childNodes;

  // Loop through tasks
  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }

  // Update local storage
  updateLocalStorage();
};

// Add task on enter
if (inputElement)
  inputElement.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  });

// Toastify
const addTaskAlert = () => {
  Toastify({
    text: "Tarefa adicionada",
    duration: 1500,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    backgroundColor: "#008000",
  }).showToast();
};

const deleteTaskAlert = () => {
  Toastify({
    text: "Tarefa deletada",
    duration: 1500,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    backgroundColor: "#ff0000",
  }).showToast();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
  // Get all tasks
  const tasks = tasksContainer.childNodes;

  // Loop through tasks
  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
    if (currentTaskIsBeingClicked) {
      taskItemContainer.remove();
      deleteTaskAlert();
    }
  }

  // Update local storage
  updateLocalStorage();
};

const handleInputChange = () => {
  // Validate input
  const inputIsValid = validateInput();

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

const updateLocalStorage = () => {
  // Get all tasks
  const tasks = tasksContainer.childNodes;

  // Map tasks
  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted };
  });

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
  // Get tasks from local storage
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  // Return if there are no tasks
  if (!tasksFromLocalStorage) return;

  // Loop through tasks
  for (const task of tasksFromLocalStorage) {
    // Create elements
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;
    if (task.isCompleted === true) taskContent.classList.add("completed");
    taskContent.addEventListener("click", () => handleClick(taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far", "fa-trash-alt");

    deleteItem.addEventListener("click", () =>
      handleDeleteClick(taskItemContainer, taskContent)
    );

    // Append
    tasksContainer.appendChild(taskItemContainer);
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
  }
};

// Refresh tasks using local storage
refreshTasksUsingLocalStorage();

// Events
addTaskButton.addEventListener("click", () => handleAddTask());
inputElement.addEventListener("change", () => handleInputChange());
