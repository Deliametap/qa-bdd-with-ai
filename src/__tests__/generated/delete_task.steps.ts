// File 1: delete_task.steps.ts

import { loadFeature, defineFeature } from "jest-cucumber";

const feature = loadFeature("src/__tests__/features/delete_task.feature");

defineFeature(feature, (test) => {
  let taskList: string[];
  let errorMessage: string | null;

  const deleteTask = (taskName: string) => {
    const taskIndex = taskList.indexOf(taskName);
    if (taskIndex !== -1) {
      taskList.splice(taskIndex, 1);
      errorMessage = null;
    } else {
      errorMessage = "Task not found";
    }
  };

  test("Delete a task successfully", ({ given, when, then }) => {
    given("the task list contains:", (table) => {
      taskList = table.map((row: { title: string }) => row.title);
    });

    when(/^I delete the task named "(.*)"$/, (taskName) => {
      deleteTask(taskName);
    });

    then(/^the task list should not contain "(.*)"$/, (taskName) => {
      expect(taskList).not.toContain(taskName);
    });
  });

  test("Delete non-existing task", ({ given, when, then }) => {
    given("the task list contains:", (table) => {
      taskList = table.map((row: { title: string }) => row.title);
    });

    when(/^I delete the task named "(.*)"$/, (taskName) => {
      deleteTask(taskName);
    });

    then(/^I should see an error message "(.*)"$/, (expectedMessage) => {
      expect(errorMessage).toBe(expectedMessage);
    });
  });
});
