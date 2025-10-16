Feature: Read Tasks
  As a user
  I want to view my list of tasks
  So that I can see what needs to be done

  Background:
    Given the task list contains:
      | title        |
      | Learn BDD    |
      | Write tests  |

  Scenario: View all tasks
    When I request the list of tasks
    Then I should see 2 tasks in the list

  Scenario: Find a task by name
    When I search for a task named "Learn BDD"
    Then the result should include "Learn BDD"
