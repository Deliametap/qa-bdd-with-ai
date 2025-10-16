// File: readTasks.steps.ts
import { loadFeature, defineFeature } from 'jest-cucumber';
import { resetTasks, addTask, getTasks } from '../../lib/taskManager';

const feature = loadFeature('src/__tests__/features/readTasks.feature');

defineFeature(feature, (test) => {
  beforeEach(() => {
    resetTasks();
  });

  test('View all tasks', ({ given, when, then }) => {
    given('the task list contains:', (dataTable) => {
      dataTable.rawTable.slice(1).forEach((row) => {
        const title = row[0];
        addTask(title);
      });
    });

    when('I request the list of tasks', () => {
      // No action needed, just preparing for the next step
    });

    then('I should see 2 tasks in the list', () => {
      const tasks = getTasks();
      expect(tasks.length).toBe(2);
    });
  });

  test('Find a task by name', ({ when, then }) => {
    given('the task list contains:', (dataTable) => {
      dataTable.rawTable.slice(1).forEach((row) => {
        const title = row[0];
        addTask(title);
      });
    });

    when('I search for a task named "Learn BDD"', () => {
      // No action needed, just preparing for the next step
    });

    then('the result should include "Learn BDD"', () => {
      const tasks = getTasks();
      const taskTitles = tasks.map(task => task.title);
      expect(taskTitles).toContain('Learn BDD');
    });
  });
});
