// File: deleteTask.steps.ts
import { loadFeature, defineFeature } from 'jest-cucumber';
import { resetTasks, addTask, deleteTask, getTasks } from '../../lib/taskManager';

const feature = loadFeature('src/__tests__/features/deleteTask.feature');

defineFeature(feature, (test) => {
  beforeEach(() => {
    resetTasks();
  });

  test('Delete a task successfully', ({ given, when, then }) => {
    given('the task list contains:', (dataTable) => {
      dataTable.rawTable.slice(1).forEach(row => {
        addTask(row[0]);
      });
    });

    when('I delete the task named "Learn BDD"', () => {
      deleteTask(1); // Assuming "Learn BDD" is the first task added
    });

    then('the task list should not contain "Learn BDD"', () => {
      const tasks = getTasks();
      expect(tasks.some(task => task.title === "Learn BDD")).toBe(false);
    });
  });

  test('Delete non-existing task', ({ when, then }) => {
    when('I delete the task named "Unknown Task"', () => {
      expect(() => deleteTask(999)).toThrow("Task not found");
    });

    then('I should see an error message "Task not found"', () => {
      // The error message is already asserted in the previous step
    });
  });
});
