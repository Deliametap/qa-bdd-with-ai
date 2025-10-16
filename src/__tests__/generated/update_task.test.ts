// File 2: update_task.test.ts
import { updateTask } from "../../lib/update_task";

describe("Update Task", () => {
  let taskList: { title: string }[];

  beforeEach(() => {
    taskList = [{ title: "Learn BDD" }];
  });

  test("Update task name successfully", () => {
    updateTask(taskList, "Learn BDD", "Learn Jest-Cucumber");
    expect(taskList).toEqual([{ title: "Learn Jest-Cucumber" }]);
  });

  test("Update non-existing task", () => {
    const result = updateTask(taskList, "Nonexistent", "Updated");
    expect(result).toBe("Task not found");
  });
});
