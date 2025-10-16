// File: readTasks.test.ts
import { resetTasks, addTask, getTasks } from '../../lib/taskManager';

describe('Read Tasks', () => {
  beforeEach(() => {
    resetTasks();
  });

  test('should return all tasks', () => {
    addTask('Learn BDD');
    addTask('Write tests');

    const tasks = getTasks();
    expect(tasks.length).toBe(2);
  });

  test('should find a task by name', () => {
    addTask('Learn BDD');
    addTask('Write tests');

    const tasks = getTasks();
    const taskTitles = tasks.map(task => task.title);
    expect(taskTitles).toContain('Learn BDD');
  });
});
