// File 2: delete_task.test.ts

import { deleteTask } from "../../lib/delete_task";

describe("Delete Task", () => {
  let taskList: string[];

  beforeEach(() => {
    taskList = ["Learn BDD", "Write tests"];
  });

  test("Delete a task successfully", () => {
    deleteTask("Learn BDD", taskList);
    expect(taskList).not.toContain("Learn BDD");
  });

  test("Delete non-existing task", () => {
    const result = deleteTask("Unknown Task", taskList);
    expect(result).toBe("Task not found");
  });
});
