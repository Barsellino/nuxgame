# todo-favorites Specification

## Purpose
Defines the ability to mark todos as favorites, persist favorites per user in localStorage, and filter the list to show only favorites.

## Requirements
### Requirement: Favorite toggle on todos
Each todo item SHALL provide a control to add or remove it from favorites. Favorites SHALL be stored per user in `localStorage` under key `favoriteTodoIdsByUser` as an object mapping the user's id to an array of favorite todo ids.

#### Scenario: Toggle favorite on
- **WHEN** user marks a todo as favorite
- **THEN** its id is added to the current user's entry in `favoriteTodoIdsByUser` in localStorage

#### Scenario: Toggle favorite off
- **WHEN** user removes a todo from favorites
- **THEN** its id is removed from the current user's entry in `favoriteTodoIdsByUser` in localStorage

#### Scenario: Favorites isolated per user
- **WHEN** two different users favorite different todos
- **THEN** each user's favorites are stored and read independently

### Requirement: Favorites filter
When the status filter is set to Favorites, the list SHALL show only todos whose ids are stored for the current user in `favoriteTodoIdsByUser`.

#### Scenario: Show favorites only
- **WHEN** user selects Favorites in the status filter
- **THEN** only favorited todos are displayed

### Requirement: Favorites persistence
Favorite selections SHALL persist across page reloads via localStorage.

#### Scenario: Favorites survive reload
- **WHEN** user reloads the page after favoriting todos
- **THEN** the same todos remain marked as favorites

