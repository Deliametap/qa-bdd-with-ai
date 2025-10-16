// File: updateTask.steps.ts  
import { loadFeature, defineFeature } from 'jest-cucumber';
import { resetTasks, addTask, updateTask, getTasks } from '../../lib/taskManager';

const feature = loadFeature('src/__tests__/features/updateTask.feature');

defineFeature(feature, (test) => {
  beforeEach(() => {
    resetTasks();
  });

  test('Update task name successfully', ({ given, when, then }) => {
    given('the task list contains:', (dataTable) => {
      const tasks = dataTable.rawTable.slice(1).map(row => row[0]);
      tasks.forEach(title => addTask(title));
    });

    when('I rename the task "Learn BDD" to "Learn Jest-Cucumber"', () => {
      updateTask(1, { title: "Learn Jest-Cucumber" });
    });

    then('the task list should contain "Learn Jest-Cucumber"', () => {
      const tasks = getTasks();
      expect(tasks).toEqual(expect.arrayContaining([{ id: 1, title: "Learn Jest-Cucumber", completed: false }]));
    });
  });

  test('Update non-existing task', ({ when, then }) => {
    when('I rename the task "Nonexistent" to "Updated"', () => {
      expect(() => updateTask(999, { title: "Updated" })).toThrow("Task not found");
    });

    then('I should see an error message "Task not found"', () => {
      // The error message is already asserted in the when step
    });
  });
});
