// File: createTask.test.ts
import { resetTasks, addTask, getTasks } from '../../lib/taskManager';

describe('Task Manager', () => {
  beforeEach(() => {
    resetTasks();
  });

  test('should add a new task successfully', () => {
    const task = addTask('Learn BDD');
    const tasks = getTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toEqual({ id: 1, title: 'Learn BDD', completed: false });
  });

  test('should prevent adding a duplicate task', () => {
    addTask('Learn BDD');
    expect(() => addTask('Learn BDD')).toThrow('Task already exists');
  });
});
