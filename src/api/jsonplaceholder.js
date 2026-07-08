const BASE_URL = 'https://jsonplaceholder.typicode.com'

let usersCache = null

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, options)

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return response.json()
}

export function resetUsersCache() {
  usersCache = null
}

export async function fetchUsers() {
  if (!usersCache) {
    usersCache = await request('/users')
  }

  return usersCache
}

export function fetchTodos() {
  return request('/todos')
}

export function createTodo(payload) {
  return request('/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}
