Feature: Delete Task
  As a user
  I want to delete a task
  So that I can remove items that are no longer needed

  Background:
    Given the task list contains:
      | title        |
      | Learn BDD    |
      | Write tests  |

  Scenario: Delete a task successfully
    When I delete the task named "Learn BDD"
    Then the task list should not contain "Learn BDD"

  Scenario: Delete non-existing task
    When I delete the task named "Unknown Task"
    Then I should see an error message "Task not found"
