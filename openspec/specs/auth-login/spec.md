# auth-login Specification

## Purpose
Defines the home-page login flow: the login form and its input validation, authentication of the entered credentials against the JSONPlaceholder `/users` endpoint, phone normalization used for comparison, session persistence of the matched user, and error handling on failure.

## Requirements
### Requirement: Login form fields
The login page SHALL display a form with Username input, Phone number input, and a Login button styled according to the Figma reference.

#### Scenario: Form renders on home route
- **WHEN** user navigates to `/`
- **THEN** the page displays Username, Phone number fields and a Login button

### Requirement: Username input validation
The Username field SHALL accept only Latin letters `[a-zA-Z]` plus the separators `.` and `_` (to match JSONPlaceholder usernames such as `Elwyn.Skiles` and `Leopoldo_Corkery`) and SHALL strip any other characters (digits, spaces, symbols) during input.

#### Scenario: Disallowed characters blocked
- **WHEN** user attempts to type digits, spaces, or symbols other than `.`/`_` into Username
- **THEN** those characters are not added to the field value

#### Scenario: Dotted username allowed
- **WHEN** user enters `Elwyn.Skiles`
- **THEN** the value is kept unchanged in the Username field

### Requirement: Phone input validation
The Phone number field SHALL allow digits and common phone symbols (spaces, dashes, dots, parentheses, plus) and the extension marker `x`/`X`, and SHALL strip any other letters during input.

#### Scenario: Phone with extension allowed
- **WHEN** user enters `1-770-736-8031 x56442`
- **THEN** the value is accepted in the Phone number field

#### Scenario: Letters blocked
- **WHEN** user types alphabetic characters other than `x`/`X`
- **THEN** those characters are not added to the field value

### Requirement: User authentication against API
On Login submit, when both fields are non-empty, the system SHALL fetch `https://jsonplaceholder.typicode.com/users` and find a user where `username` matches case-insensitively and normalized phone values are equal.

#### Scenario: Successful login
- **WHEN** user submits Username `Bret` and Phone `1-770-736-8031`
- **THEN** the system stores the matched user in sessionStorage under key `currentUser`
- **AND** redirects to `/dashboard`

#### Scenario: Missing fields
- **WHEN** user submits with an empty Username or Phone
- **THEN** the system displays `Username and phone are required`
- **AND** does not call the API or redirect

#### Scenario: Failed login
- **WHEN** user submits credentials that do not match any user
- **THEN** the system displays the message `Invalid username or phone number`
- **AND** does not redirect

#### Scenario: Network error
- **WHEN** the users request fails
- **THEN** the system displays `Unable to connect. Please try again.`
- **AND** does not redirect

### Requirement: Phone normalization for comparison
The system SHALL normalize phone strings by converting to lowercase, discarding the extension (everything from the first `x` onward), and keeping only digits, before comparison.

#### Scenario: Extension is ignored on match
- **WHEN** API phone is `1-770-736-8031 x56442` and input is `1-770-736-8031`
- **THEN** normalized values are equal (`17707368031`)

#### Scenario: Full phone with extension also matches
- **WHEN** API phone is `1-770-736-8031 x56442` and input is `1-770-736-8031 x56442`
- **THEN** normalized values are equal (`17707368031`)

