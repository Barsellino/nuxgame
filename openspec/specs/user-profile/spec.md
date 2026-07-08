# user-profile Specification

## Purpose
Defines the protected dashboard route (guarded by a logged-in user in sessionStorage) and the display of the matched user's personal data at the top of the dashboard.

## Requirements
### Requirement: Protected dashboard route
The dashboard SHALL be available at `/dashboard` and SHALL require a logged-in user in sessionStorage.

#### Scenario: Unauthenticated access blocked
- **WHEN** user navigates to `/dashboard` without a stored user
- **THEN** the system redirects to `/`

#### Scenario: Authenticated access allowed
- **WHEN** user navigates to `/dashboard` with a valid stored user
- **THEN** the dashboard page is displayed

### Requirement: User profile display
The dashboard SHALL display the logged-in user's personal data from the matched user object: name, username, email, phone, address street, address city, and company name.

#### Scenario: Profile data visible
- **WHEN** user is on `/dashboard` after successful login
- **THEN** profile section shows name, username, email, phone, street, city, and company name

