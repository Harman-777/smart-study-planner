const storageKey = "smart-study-planner-tasks";
const subjects = ["Mathematics", "Science", "English", "Computer", "Social Studies"];

const taskForm = document.querySelector("#taskForm");
const taskList = document.querySelector("#taskList");
const filterInput = document.querySelector("#filterInput");
const dateInput = document.querySelector("#dateInput");
const subjectChart = document.querySelector("#subjectChart");
const completionRate = document.querySelector("#completionRate");
const pendingCount = document.querySelector("#pendingCount");
const doneCount = document.querySelector("#doneCount");
const totalHours = document.querySelector("#totalHours");
const urgentCount = document.querySelector("#urgentCount");
const todayLabel = document.querySelector("#todayLabel");
const timerDisplay = document.querySelector("#timerDisplay");
const startTimer = document.querySelector("#startTimer");
const resetTimer = document.querySelector("#resetTimer");
const generatePlan = document.querySelector("#generatePlan");
const riskLevel = document.querySelector("#riskLevel");
const riskReason = document.querySelector("#riskReason");
const nextTask = document.querySelector("#nextTask");
const nextTaskReason = document.querySelector("#nextTaskReason");
const weakSubject = document.querySelector("#weakSubject");
const weakReason = document.querySelector("#weakReason");
const weeklyPlan = document.querySelector("#weeklyPlan");

let tasks = loadTasks();
let timerSeconds = 25 * 60;
let timerId = null;

function loadTasks() {
  const saved = localStorage.getItem(storageKey);
  if (saved) return JSON.parse(saved);

  return [
    {
      id: createId(),
      title: "Revise trigonometry identities",
      subject: "Mathematics",
      hours: 2,
      dueDate: getDateOffset(1),
      priority: "High",
      done: false
    },
    {
      id: createId(),
      title: "Prepare science practical notes",
      subject: "Science",
      hours: 1.5,
      dueDate: getDateOffset(2),
      priority: "Medium",
      done: false
    },
    {
      id: createId(),
      title: "Complete computer project documentation",
      subject: "Computer",
      hours: 3,
      dueDate: getDateOffset(4),
      priority: "High",
      done: true
    }
  ];
}

function createId() {
  if (globalThis.crypto && globalThis.crypto.randomUUID) return globalThis.crypto.randomUUID();
  return "task-" + Date.now() + "-" + Math.random().toString(16).slice(2);
}

function saveTasks() {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function getDateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value + "T00:00:00"));
}

function render() {
  const selectedFilter = filterInput.value;
  const visibleTasks = tasks
    .filter(task => {
      if (selectedFilter === "pending") return !task.done;
      if (selectedFilter === "done") return task.done;
      if (selectedFilter === "high") return task.priority === "High";
      return true;
    })
    .sort((first, second) => first.dueDate.localeCompare(second.dueDate));

  renderTasks(visibleTasks);
  renderStats();
  renderChart();
  renderCoach();
  renderWeeklyPlan();
}

function renderTasks(visibleTasks) {
  taskList.innerHTML = "";

  if (visibleTasks.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No tasks match this filter.";
    taskList.append(empty);
    return;
  }

  visibleTasks.forEach(task => {
    const item = document.createElement("article");
    item.className = "task-item" + (task.done ? " done" : "");

    const checkbox = document.createElement("input");
    checkbox.className = "task-check";
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", "Mark " + task.title + " completed");
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
      render();
    });

    const content = document.createElement("div");
    const title = document.createElement("p");
    title.className = "task-title";
    title.textContent = task.title;

    const meta = document.createElement("div");
    meta.className = "task-meta";
    meta.append(
      makeBadge(task.subject),
      makeBadge(task.priority, task.priority === "High" ? "high" : ""),
      makeBadge("AI score " + calculateTaskScore(task), "score"),
      document.createTextNode(formatDate(task.dueDate) + " | " + task.hours + " hrs")
    );

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "X";
    deleteButton.setAttribute("aria-label", "Delete " + task.title);
    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter(savedTask => savedTask.id !== task.id);
      saveTasks();
      render();
    });

    content.append(title, meta);
    item.append(checkbox, content, deleteButton);
    taskList.append(item);
  });
}

function calculateTaskScore(task) {
  if (task.done) return 0;

  const today = new Date();
  const dueDate = new Date(task.dueDate + "T00:00:00");
  const daysLeft = Math.ceil((dueDate - today) / 86400000);
  const priorityScore = { High: 45, Medium: 28, Low: 14 }[task.priority];
  const dueScore = daysLeft < 0 ? 40 : Math.max(4, 32 - daysLeft * 4);
  const effortScore = Math.min(18, Number(task.hours) * 3);

  return Math.min(100, Math.round(priorityScore + dueScore + effortScore));
}

function getPendingTasksByScore() {
  return tasks
    .filter(task => !task.done)
    .map(task => ({ ...task, score: calculateTaskScore(task) }))
    .sort((first, second) => second.score - first.score);
}

function getSubjectAnalysis() {
  return subjects.map(subject => {
    const subjectTasks = tasks.filter(task => task.subject === subject);
    const pending = subjectTasks.filter(task => !task.done);
    const completed = subjectTasks.filter(task => task.done);
    const pendingHours = pending.reduce((sum, task) => sum + Number(task.hours), 0);
    const completedHours = completed.reduce((sum, task) => sum + Number(task.hours), 0);
    const highPriority = pending.filter(task => task.priority === "High").length;
    const weaknessScore = pendingHours * 12 + highPriority * 18 - completedHours * 4;

    return { subject, pendingHours, completedHours, highPriority, weaknessScore };
  }).sort((first, second) => second.weaknessScore - first.weaknessScore);
}

function renderCoach() {
  const pending = getPendingTasksByScore();
  const urgent = pending.filter(task => task.score >= 75).length;
  const totalPendingHours = pending.reduce((sum, task) => sum + Number(task.hours), 0);

  if (urgent >= 3 || totalPendingHours >= 10) {
    riskLevel.textContent = "High";
    riskReason.textContent = "Several urgent tasks or too many pending hours are building up.";
  } else if (urgent >= 1 || totalPendingHours >= 5) {
    riskLevel.textContent = "Medium";
    riskReason.textContent = "You have some pressure. Finish the highest-score task first.";
  } else {
    riskLevel.textContent = "Low";
    riskReason.textContent = "Your current workload is manageable if you stay consistent.";
  }

  if (pending.length > 0) {
    const best = pending[0];
    nextTask.textContent = best.title;
    nextTaskReason.textContent = best.subject + " should come first because its AI score is " + best.score + ".";
  } else {
    nextTask.textContent = "No pending task";
    nextTaskReason.textContent = "All tasks are completed. Add more goals to continue planning.";
  }

  const weakest = getSubjectAnalysis()[0];
  if (weakest && weakest.weaknessScore > 0) {
    weakSubject.textContent = weakest.subject;
    weakReason.textContent = weakest.pendingHours + " pending hours and " + weakest.highPriority + " high priority task(s).";
  } else {
    weakSubject.textContent = "Balanced";
    weakReason.textContent = "No subject currently needs special attention.";
  }
}

function renderWeeklyPlan() {
  const pending = getPendingTasksByScore();
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  weeklyPlan.innerHTML = "";

  dayNames.forEach((day, index) => {
    const card = document.createElement("article");
    card.className = "day-card";

    const title = document.createElement("strong");
    title.textContent = day;

    const text = document.createElement("p");
    const task = pending[index % Math.max(pending.length, 1)];
    text.textContent = task
      ? task.subject + ": " + task.title + " (" + Math.min(task.hours, 2) + "h)"
      : "Revision, notes cleanup, or mock test practice.";

    card.append(title, text);
    weeklyPlan.append(card);
  });
}

function makeBadge(text, className = "") {
  const badge = document.createElement("span");
  badge.className = "badge " + className;
  badge.textContent = text;
  return badge;
}

function renderStats() {
  const completed = tasks.filter(task => task.done).length;
  const pending = tasks.length - completed;
  const urgent = tasks.filter(task => !task.done && task.priority === "High").length;
  const hours = tasks.reduce((sum, task) => sum + Number(task.hours), 0);
  const rate = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

  pendingCount.textContent = pending;
  doneCount.textContent = completed;
  urgentCount.textContent = urgent;
  totalHours.textContent = hours.toFixed(hours % 1 === 0 ? 0 : 1);
  completionRate.textContent = rate + "%";
}

function renderChart() {
  const totals = Object.fromEntries(subjects.map(subject => [subject, 0]));
  tasks.forEach(task => {
    totals[task.subject] += Number(task.hours);
  });

  const max = Math.max(...Object.values(totals), 1);
  subjectChart.innerHTML = "";

  subjects.forEach(subject => {
    const row = document.createElement("div");
    row.className = "bar-row";

    const label = document.createElement("strong");
    label.textContent = subject;

    const track = document.createElement("div");
    track.className = "bar-track";

    const fill = document.createElement("div");
    fill.className = "bar-fill";
    fill.style.width = Math.round((totals[subject] / max) * 100) + "%";

    const value = document.createElement("span");
    value.textContent = totals[subject] + "h";

    track.append(fill);
    row.append(label, track, value);
    subjectChart.append(row);
  });
}

function updateTimerDisplay() {
  const minutes = Math.floor(timerSeconds / 60).toString().padStart(2, "0");
  const seconds = (timerSeconds % 60).toString().padStart(2, "0");
  timerDisplay.textContent = minutes + ":" + seconds;
}

function toggleTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    startTimer.textContent = "Start";
    return;
  }

  startTimer.textContent = "Pause";
  timerId = setInterval(() => {
    timerSeconds -= 1;
    if (timerSeconds <= 0) {
      clearInterval(timerId);
      timerId = null;
      timerSeconds = 0;
      startTimer.textContent = "Start";
      alert("Focus session complete. Add your studied topic to the planner.");
    }
    updateTimerDisplay();
  }, 1000);
}

function resetFocusTimer() {
  clearInterval(timerId);
  timerId = null;
  timerSeconds = 25 * 60;
  startTimer.textContent = "Start";
  updateTimerDisplay();
}

taskForm.addEventListener("submit", event => {
  event.preventDefault();
  const task = {
    id: createId(),
    title: document.querySelector("#titleInput").value.trim(),
    subject: document.querySelector("#subjectInput").value,
    hours: Number(document.querySelector("#hoursInput").value),
    dueDate: document.querySelector("#dateInput").value,
    priority: document.querySelector("#priorityInput").value,
    done: false
  };

  if (!task.title || !task.dueDate) return;
  tasks.push(task);
  saveTasks();
  taskForm.reset();
  dateInput.value = getDateOffset(1);
  render();
});

filterInput.addEventListener("change", render);
startTimer.addEventListener("click", toggleTimer);
resetTimer.addEventListener("click", resetFocusTimer);
generatePlan.addEventListener("click", () => {
  renderCoach();
  renderWeeklyPlan();
});

todayLabel.textContent = new Intl.DateTimeFormat("en", {
  weekday: "long",
  month: "short",
  day: "numeric"
}).format(new Date());
dateInput.value = getDateOffset(1);
saveTasks();
updateTimerDisplay();
render();
