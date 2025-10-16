// File 1: update_task.steps.ts
import { loadFeature, defineFeature } from "jest-cucumber";

const feature = loadFeature("src/__tests__/features/update_task.feature");

defineFeature(feature, (test) => {
  let taskList: { title: string }[] = [];
  let errorMessage: string | null = null;

  const updateTask = (oldTitle: string, newTitle: string) => {
    const task = taskList.find((task) => task.title === oldTitle);
    if (task) {
      task.title = newTitle;
    } else {
      errorMessage = "Task not found";
    }
  };

  test("Update task name successfully", ({ given, when, then }) => {
    given("the task list contains:", (table) => {
      taskList = table.map((row: { title: string }) => ({ title: row.title }));
    });

    when(/^I rename the task "(.*)" to "(.*)"$/, (oldTitle, newTitle) => {
      updateTask(oldTitle, newTitle);
    });

    then(/^the task list should contain "(.*)"$/, (expectedTitle) => {
      expect(taskList.some((task) => task.title === expectedTitle)).toBe(true);
    });
  });

  test("Update non-existing task", ({ given, when, then }) => {
    given("the task list contains:", (table) => {
      taskList = table.map((row: { title: string }) => ({ title: row.title }));
    });

    when(/^I rename the task "(.*)" to "(.*)"$/, (oldTitle, newTitle) => {
      updateTask(oldTitle, newTitle);
    });

    then(/^I should see an error message "(.*)"$/, (expectedMessage) => {
      expect(errorMessage).toBe(expectedMessage);
    });
  });
});
