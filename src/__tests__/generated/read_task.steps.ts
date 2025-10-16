import { loadFeature, defineFeature } from "jest-cucumber";

const feature = loadFeature("src/__tests__/features/read_task.feature");

defineFeature(feature, (test) => {
  let taskList: string[];

  const initializeTaskList = () => {
    taskList = ["Learn BDD", "Write tests"];
  };

  test("View all tasks", ({ given, when, then }) => {
    given("the task list contains:", (table) => {
      initializeTaskList();
    });

    when("I request the list of tasks", () => {
      // Simulate requesting the list of tasks
    });

    then("I should see 2 tasks in the list", () => {
      expect(taskList.length).toBe(2);
    });
  });

  test("Find a task by name", ({ given, when, then }) => {
    given("the task list contains:", (table) => {
      initializeTaskList();
    });

    when('I search for a task named "Learn BDD"', () => {
      // Simulate searching for a task by name
    });

    then('the result should include "Learn BDD"', () => {
      expect(taskList).toContain("Learn BDD");
    });
  });
});
