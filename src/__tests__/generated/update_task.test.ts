// File: updateTask.test.ts  
import { resetTasks, addTask, updateTask, getTasks } from '../../lib/taskManager';

describe('Update Task', () => {
  beforeEach(() => {
    resetTasks();
  });

  test('should update task name successfully', () => {
    addTask("Learn BDD");
    updateTask(1, { title: "Learn Jest-Cucumber" });
    const tasks = getTasks();
    expect(tasks).toEqual(expect.arrayContaining([{ id: 1, title: "Learn Jest-Cucumber", completed: false }]));
  });

  test('should throw error when updating non-existing task', () => {
    expect(() => updateTask(999, { title: "Updated" })).toThrow("Task not found");
  });
});
