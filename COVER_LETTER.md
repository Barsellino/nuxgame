# Cover Letter — Vue.js Todo Dashboard (Test Assignment)

Hello!

Please find my completed test assignment. Repository: https://github.com/Barsellino/nuxgame

## What was implemented

A single-page application built with Vue 3 that integrates with JSONPlaceholder and covers both parts of the assignment:

1. **Login page** — a form with Username and Phone number fields and a Login button. Input is validated on the fly: Username accepts letters (plus `.` and `_`, since real JSONPlaceholder usernames like `Elwyn.Skiles` contain them), Phone accepts digits and symbols. On submit the app fetches `/users`, matches `username` (case-insensitive) and the normalized phone: on a match it redirects to the dashboard, otherwise it shows a login error.
2. **Dashboard** — the user's personal data at the top; below it, the todo list from `/todos` with filters (status: All / Completed / Uncompleted / Favorites; by userId), title search, a Create todo form, and the ability to add todos to Favorites persisted in `localStorage`.

## Stack and decisions

- Vue 3 (Composition API), Vue Router, **Pinia** for state management (`auth`, `todos`, `favorites` stores), Vite.
- Thin API layer, pure utilities (validation / phone normalization / filters), small modular components.
- Responsive layout using Flexbox and CSS Grid.

## JSONPlaceholder specifics handled explicitly

- Phone normalization ignores the extension (`x…`), so login works both with `1-770-736-8031` and the full `1-770-736-8031 x56442`.
- Since the API always returns `id: 201` on POST, created todos are assigned a unique client-side id (no collisions) and are persisted per user in `localStorage`, surviving page reloads.
- Protected dashboard route (a guard checks the session).

## Quality

- Tests with Vitest + Vue Test Utils: **87 tests, 100% coverage** of the code in `src/`.
- ESLint + Prettier, GitHub Actions (lint, tests with a 100% coverage threshold, production build).
- Requirements specification in OpenSpec format (`openspec/specs/`).

## How to run

```sh
npm install
npm run dev        # start the app
npm run test:run   # run the tests
```

## Login credentials (use the username, not the display name)

- `Bret` / `1-770-736-8031`
- `Antonette` / `010-692-6593`
- `Samantha` / `1-463-123-4447`

I would be happy to answer any questions or walk through the code in more detail.

Best regards,
[Your name]
