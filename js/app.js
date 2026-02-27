const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const counter = document.getElementById("counter");
const counterCompleted = document.getElementById("counterCompleted");

function updateUI() {
  var items = taskList.querySelectorAll(".item");
  var total = items.length;

  var completed = 0;
  items.forEach(function (li) {
    if (li.classList.contains("completed")) {
      completed++;
    }
  });

  if (total === 0) {
    emptyMessage.style.display = "block";
    counterCompleted.style.display = "none";
    counter.textContent = "Add something to get started";
    return;
  }

  emptyMessage.style.display = "none";
  counterCompleted.style.display = "block";
  counterCompleted.textContent = completed + " of " + total + " completed";

  if (completed > 0) {
    counter.textContent = "Keep it up!";
  } else {
    counter.textContent = (total - completed) + " pending tasks";
  }
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  taskList.querySelectorAll(".item--new").forEach((el) => {
    el.classList.remove("item--new");
  });

  const li = document.createElement("li");
  li.className = "item item--new";

  const left = document.createElement("div");
  left.className = "item-left";

  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.textContent = "✦";

  const span = document.createElement("span");
  span.className = "text";
  span.textContent = text;

  left.appendChild(sparkle);
  left.appendChild(span);

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = "new";

  const delBtn = document.createElement("button");
  delBtn.className = "delete";
  delBtn.type = "button";
  delBtn.textContent = "✕";

  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    updateUI();
  });

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateUI();
  });

  li.appendChild(left);
  li.appendChild(badge);
  li.appendChild(delBtn);

  taskList.prepend(li);

  taskInput.value = "";
  taskInput.focus();
  updateUI();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

updateUI();