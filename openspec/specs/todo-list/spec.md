# todo-list Specification

## Purpose
Defines the dashboard todo experience: fetching todos from JSONPlaceholder, listing them, filtering by status and user id, searching by title, creating new todos with client-side id assignment and local persistence, and the responsive layout.

## Requirements
### Requirement: Fetch and display todos
The dashboard SHALL fetch todos from `https://jsonplaceholder.typicode.com/todos` on mount and display all items in a list showing id, userId, title, and completed status.

#### Scenario: Todos loaded on dashboard
- **WHEN** user opens `/dashboard`
- **THEN** todos are fetched from the API
- **AND** all todos are rendered in a list

### Requirement: Status filter
The dashboard SHALL provide a select filter with options: All, Completed, Uncompleted, and Favorites.

#### Scenario: Completed filter
- **WHEN** user selects Completed
- **THEN** only todos with `completed: true` are shown

#### Scenario: Uncompleted filter
- **WHEN** user selects Uncompleted
- **THEN** only todos with `completed: false` are shown

### Requirement: User ID filter
The dashboard SHALL provide a select filter with option All Users and one option per unique `userId` present in the todos array.

#### Scenario: Filter by userId
- **WHEN** user selects a specific userId
- **THEN** only todos with that userId are shown

### Requirement: Title search
The dashboard SHALL provide a title search input that filters todos by case-insensitive substring match on `title`, combined with active status and userId filters.

#### Scenario: Search with filters
- **WHEN** user selects Completed, a userId, and enters search text
- **THEN** only todos matching all active filters and search text are shown

### Requirement: Create todo
The dashboard SHALL include a Create todo block with User ID input, Title input, and Add button. On successful POST to `/todos`, the system SHALL assign the new todo a unique client-side id (greater than the API id ceiling of 200 and greater than any existing id) and SHALL prepend it to the local todos list. The form SHALL require a User ID and a non-empty Title before submitting.

#### Scenario: Add new todo
- **WHEN** user enters userId and a non-empty title and clicks Add
- **THEN** the system POSTs to `/todos`
- **AND** on success prepends the new todo to the displayed list with a unique id

#### Scenario: Missing fields blocked
- **WHEN** user clicks Add with an empty User ID or Title
- **THEN** the system shows `User ID and Title are required` and does not POST

#### Scenario: Unique ids across multiple adds
- **WHEN** user adds several todos in a row
- **THEN** each created todo receives a distinct id (the API always returning `201` does not cause id collisions)

### Requirement: Created todos persistence
Todos created on the client SHALL be persisted in `localStorage` under key `createdTodosByUser`, keyed by the logged-in user's id, and SHALL be re-merged into the list ahead of freshly fetched API todos on subsequent loads.

#### Scenario: Created todo survives reload
- **WHEN** user creates a todo and later reloads the dashboard
- **THEN** the created todo is still present in the list

### Requirement: Responsive layout
The dashboard layout SHALL use Flexbox and/or CSS Grid and SHALL be responsive across viewport sizes.

#### Scenario: Layout adapts on resize
- **WHEN** viewport width changes
- **THEN** dashboard sections reflow without horizontal overflow

