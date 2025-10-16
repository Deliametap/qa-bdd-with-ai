// File: createTask.steps.ts
import { loadFeature, defineFeature } from 'jest-cucumber';
import { resetTasks, addTask, getTasks } from '../../lib/taskManager';

const feature = loadFeature('src/__tests__/features/createTask.feature');

defineFeature(feature, (test) => {
  beforeEach(() => {
    resetTasks();
  });

  test('Add a new task successfully', ({ given, when, then }) => {
    given('the task list is empty', () => {
      // The task list is reset in beforeEach
    });

    when('I add a task named "Learn BDD"', () => {
      addTask('Learn BDD');
    });

    then('the task list should contain "Learn BDD"', () => {
      const tasks = getTasks();
      expect(tasks).toHaveLength(1);
      expect(tasks[0].title).toBe('Learn BDD');
    });
  });

  test('Prevent adding a duplicate task', ({ given, when, then }) => {
    given('a task named "Learn BDD" already exists', () => {
      addTask('Learn BDD');
    });

    when('I add a task named "Learn BDD"', () => {
      expect(() => addTask('Learn BDD')).toThrow('Task already exists');
    });

    then('I should see an error message "Task already exists"', () => {
      // The error message is checked in the when step
    });
  });
});
