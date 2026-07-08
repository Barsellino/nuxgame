import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createTodo, fetchTodos, fetchUsers, resetUsersCache } from './jsonplaceholder'

describe('jsonplaceholder api', () => {
  beforeEach(() => {
    resetUsersCache()
    vi.stubGlobal('fetch', vi.fn())
  })

  it('fetchUsers returns parsed json', async () => {
    const users = [{ id: 1, username: 'Bret' }]
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(users) })

    await expect(fetchUsers()).resolves.toEqual(users)
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users', {})
  })

  it('fetchUsers uses cache on subsequent calls', async () => {
    const users = [{ id: 1, username: 'Bret' }]
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(users) })

    await fetchUsers()
    await fetchUsers()

    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('fetchTodos returns parsed json', async () => {
    const todos = [{ id: 1, title: 'test' }]
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(todos) })

    await expect(fetchTodos()).resolves.toEqual(todos)
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos', {})
  })

  it('createTodo posts payload and returns parsed json', async () => {
    const payload = { userId: 1, title: 'New', completed: false }
    const created = { id: 201, ...payload }
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(created) })

    await expect(createTodo(payload)).resolves.toEqual(created)
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  })

  it('throws when response is not ok', async () => {
    fetch.mockResolvedValue({ ok: false, status: 500 })

    await expect(fetchUsers()).rejects.toThrow('Request failed: 500')
  })
})
