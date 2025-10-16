// File 1: create_task.steps.ts
import { loadFeature, defineFeature } from "jest-cucumber";

const feature = loadFeature("src/__tests__/features/create_task.feature");

defineFeature(feature, (test) => {
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

  test("Add a new task successfully", ({ given, when, then }) => {
    given("the task list is empty", () => {
      taskList = [];
    });

    when(/^I add a task named "(.*)"$/, (taskName: string) => {
      addTask(taskName);
    });

    then(/^the task list should contain "(.*)"$/, (taskName: string) => {
      expect(taskList).toContain(taskName);
    });
  });

  test("Prevent adding a duplicate task", ({ given, when, then }) => {
    given(/^a task named "(.*)" already exists$/, (taskName: string) => {
      taskList = [taskName];
    });

    when(/^I add a task named "(.*)"$/, (taskName: string) => {
      addTask(taskName);
    });

    then(/^I should see an error message "(.*)"$/, (expectedErrorMessage: string) => {
      expect(errorMessage).toBe(expectedErrorMessage);
    });
  });
});
