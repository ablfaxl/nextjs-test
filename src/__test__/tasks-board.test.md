# TaskBoard Component Test Suite

## Overview

This file contains unit tests for the TaskBoard component using React Testing Library and Jest. The tests focus on verifying the correct rendering and behavior of the TaskBoard component in isolation.

## Test Type: Unit Test

These tests are classified as unit tests because:

1. They focus on testing a single component (TaskBoard) in isolation.
2. Dependencies (like the TaskCard component) are mocked to isolate the component under test.
3. They verify the component's output based on different inputs without testing integration with other components or systems.

## Test Structure

The test suite includes the following:

1. Mock setup for the TaskCard component
2. A describe block for the TaskBoard component tests
3. Three individual test cases

### Test Cases

1. **Renders all columns**: Verifies that the TaskBoard renders the "todo", "inProgress", and "done" columns.
2. **Renders correct number of TaskCards**: Ensures that the correct number of TaskCards are rendered based on the input tasks.
3. **Renders tasks in correct columns**: Checks if each task is rendered in its correct column.

## Mock Data and Functions

- `mockTasks`: An object representing the tasks in different states (todo, inProgress, done).
- `mockRemoveTask`: A mock function for the removeTask prop.
- `mockMoveTask`: A mock function for the moveTask prop.

## Running the Tests

To run these tests, use the following command in your project directory:

```
npm test
```

or

```
yarn test
```

## Notes

- The TaskCard component is mocked to simplify testing and focus on the TaskBoard component's behavior.
- These tests cover the basic rendering of the TaskBoard but do not test user interactions or state changes. For more comprehensive testing, consider adding integration tests or end-to-end tests.
