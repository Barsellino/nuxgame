# Vue Todo Dashboard

Test assignment app built with Vue 3, Vue Router, Pinia, and the JSONPlaceholder API.

## Features

- Login form authenticated against `/users` by `username` (case-insensitive) and phone
- Username input accepts letters plus `.` and `_` (matches usernames like `Elwyn.Skiles`)
- Phone input accepts digits, common symbols, and the extension marker `x`; other letters are blocked
- Phone comparison normalizes formatting and ignores the extension, so `1-770-736-8031` and `1-770-736-8031 x56442` both match
- Distinct login error messages for empty fields, invalid credentials, and network failures
- Protected dashboard route (guard checks a logged-in user in `sessionStorage`)
- Dashboard with user profile, todo list, status/user filters, title search, and create todo
- Created todos get a unique client-side id (JSONPlaceholder always returns `201`) and persist per user in `localStorage`
- Favorites stored per user in `localStorage`
- Responsive layout using Flexbox and CSS Grid
- Shared state managed with Pinia stores (auth, todos, favorites)

## Project Setup

```sh
npm install
```

### Development

```sh
npm run dev
```

### Production Build

```sh
npm run build
```

### Linting

```sh
npm run lint
npm run lint:check
npm run format
```

### Tests

```sh
npm run test
npm run test:run
npm run test:coverage
```

Coverage threshold is set to **100%** for application code in `src/`.

## CI

GitHub Actions runs on every push and pull request:

- ESLint (`npm run lint:check`)
- Vitest with 100% coverage threshold
- Production build

## Test Credentials

Enter the `username` (not the display name) and phone of any user from
[JSONPlaceholder users](https://jsonplaceholder.typicode.com/users):

| Username | Phone |
|----------|-------|
| `Bret` | `1-770-736-8031` |
| `Antonette` | `010-692-6593` |
| `Samantha` | `1-463-123-4447` |
| `Elwyn.Skiles` | `210.067.6132` |

Username match is case-insensitive. Phone comparison ignores formatting and the
extension, so you can enter the number with or without the trailing `x…` part.

## Project Structure

```
src/
  api/              REST API client (with users cache)
  stores/           Pinia stores: auth, todos, favorites
  components/       UI blocks
  constants/        storage keys, auth and todo messages
  router/           routes and auth guard
  utils/            pure helpers (validation, phone, filters)
  views/            Login and Dashboard pages
  test/             Vitest setup and helpers
```

Tests are colocated next to the code they cover (`*.test.js`).

## Stack

- Vue 3 + Composition API
- Pinia (state management)
- Vue Router
- Vite
- Vitest + Vue Test Utils
- ESLint + Prettier
