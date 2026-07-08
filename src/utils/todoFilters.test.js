import { describe, expect, it } from 'vitest'
import { filterTodos, getUniqueUserIds } from './todoFilters'
import { mockTodos } from '../test/fixtures'

describe('filterTodos', () => {
  const isFavorite = (id) => id === 1

  it('returns all todos when filters are default', () => {
    expect(
      filterTodos(mockTodos, { status: 'all', userId: 'all', search: '' }, isFavorite),
    ).toEqual(mockTodos)
  })

  it('filters by userId', () => {
    const result = filterTodos(mockTodos, { status: 'all', userId: '1', search: '' }, isFavorite)
    expect(result).toHaveLength(2)
    expect(result.every((todo) => todo.userId === 1)).toBe(true)
  })

  it('filters completed todos', () => {
    const result = filterTodos(
      mockTodos,
      { status: 'completed', userId: 'all', search: '' },
      isFavorite,
    )
    expect(result).toEqual([mockTodos[1]])
  })

  it('filters uncompleted todos', () => {
    const result = filterTodos(
      mockTodos,
      { status: 'uncompleted', userId: 'all', search: '' },
      isFavorite,
    )
    expect(result).toEqual([mockTodos[0], mockTodos[2]])
  })

  it('filters favorites', () => {
    const result = filterTodos(
      mockTodos,
      { status: 'favorites', userId: 'all', search: '' },
      isFavorite,
    )
    expect(result).toEqual([mockTodos[0]])
  })

  it('filters by search query', () => {
    const result = filterTodos(
      mockTodos,
      { status: 'all', userId: 'all', search: 'facilis' },
      isFavorite,
    )
    expect(result).toEqual([mockTodos[1]])
  })

  it('combines filters', () => {
    const result = filterTodos(
      mockTodos,
      { status: 'uncompleted', userId: '1', search: 'delectus' },
      isFavorite,
    )
    expect(result).toEqual([mockTodos[0]])
  })
})

describe('getUniqueUserIds', () => {
  it('returns sorted unique user ids', () => {
    expect(getUniqueUserIds(mockTodos)).toEqual([1, 2])
  })

  it('returns empty array for empty todos', () => {
    expect(getUniqueUserIds([])).toEqual([])
  })
})
