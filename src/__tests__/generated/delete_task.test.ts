// File: deleteTask.test.ts
import { resetTasks, addTask, deleteTask, getTasks } from '../../lib/taskManager';

describe('Task Manager - Delete Task', () => {
  beforeEach(() => {
    resetTasks();
  });

  test('should delete a task successfully', () => {
    addTask('Learn BDD');
    addTask('Write tests');

    deleteTask(1); // Deleting "Learn BDD"

    const tasks = getTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks.some(task => task.title === 'Learn BDD')).toBe(false);
  });

  test('should throw an error when deleting a non-existing task', () => {
    expect(() => deleteTask(999)).toThrow("Task not found");
  });
});
