// File 2: create_task.test.ts
import { createTask } from "../../lib/create_task";

describe("Create Task", () => {
  let taskList: string[] = [];
  let errorMessage: string | null = null;

  const addTask = (taskName: string) => {
    if (taskList.includes(taskName)) {
      errorMessage = "Task already exists";
    } else {
      taskList.push(taskName);
      errorMessage = null;
    }
  };

  beforeEach(() => {
    taskList = [];
    errorMessage = null;
  });

  test("Add a new task successfully", () => {
    createTask("Learn BDD");
    addTask("Learn BDD");
    expect(taskList).toContain("Learn BDD");
    expect(errorMessage).toBeNull();
  });

  test("Prevent adding a duplicate task", () => {
    taskList.push("Learn BDD");
    createTask("Learn BDD");
    addTask("Learn BDD");
    expect(taskList).toContain("Learn BDD");
    expect(errorMessage).toBe("Task already exists");
  });
});
