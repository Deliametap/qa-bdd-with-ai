Feature: Create Task
  As a user
  I want to add new tasks
  So that I can keep track of my work

  Background:
    Given the task list is empty

  Scenario: Add a new task successfully
    When I add a task named "Learn BDD"
    Then the task list should contain "Learn BDD"

  Scenario: Prevent adding a duplicate task
    Given a task named "Learn BDD" already exists
    When I add a task named "Learn BDD"
    Then I should see an error message "Task already exists"
