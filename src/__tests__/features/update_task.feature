Feature: Update Task
  As a user
  I want to update a task name
  So that I can correct mistakes or refine details

  Background:
    Given the task list contains:
      | title     |
      | Learn BDD |

  Scenario: Update task name successfully
    When I rename the task "Learn BDD" to "Learn Jest-Cucumber"
    Then the task list should contain "Learn Jest-Cucumber"

  Scenario: Update non-existing task
    When I rename the task "Nonexistent" to "Updated"
    Then I should see an error message "Task not found"
