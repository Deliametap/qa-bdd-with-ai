import { readTasks } from "../../lib/read_task";

describe("Read Tasks", () => {
  test("View all tasks", () => {
    const tasks = readTasks();
    expect(tasks.length).toBe(2);
  });

  test("Find a task by name", () => {
    const tasks = readTasks();
    expect(tasks).toContain("Learn BDD");
  });
});
