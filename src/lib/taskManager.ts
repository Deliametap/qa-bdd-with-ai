// src/lib/taskManager.ts
type Task = { id: number; title: string; completed: boolean };

let tasks: Task[] = [];
let idCounter = 1;

export function resetTasks() {
  tasks = [];
  idCounter = 1;
}

export function addTask(title: string) {
  if (tasks.some((t) => t.title === title)) {
    throw new Error("Task already exists");
  }
  const newTask: Task = { id: idCounter++, title, completed: false };
  tasks.push(newTask);
  return newTask;
}

export function getTasks() {
  return [...tasks];
}

export function getTaskById(id: number) {
  return tasks.find((t) => t.id === id);
}

export function updateTask(
  id: number,
  updates: Partial<Pick<Task, "title" | "completed">>
) {
  const task = getTaskById(id);
  if (!task) throw new Error("Task not found");
  Object.assign(task, updates);
  return task;
}

export function deleteTask(id: number) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) throw new Error("Task not found");
  tasks.splice(index, 1);
}
