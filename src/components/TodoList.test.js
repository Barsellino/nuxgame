import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TodoList from './TodoList.vue'
import { mockTodos } from '../test/fixtures'

describe('TodoList', () => {
  it('renders todo items', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: mockTodos,
        isFavorite: () => false,
      },
    })

    expect(wrapper.text()).toContain('3 items shown')
    expect(wrapper.findAll('.todo-item')).toHaveLength(3)
  })

  it('renders empty state', () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: [],
        isFavorite: () => false,
      },
    })

    expect(wrapper.text()).toContain('No todos match the current filters.')
  })

  it('propagates toggle-favorite event', async () => {
    const wrapper = mount(TodoList, {
      props: {
        todos: [mockTodos[0]],
        isFavorite: () => false,
      },
    })

    await wrapper.find('.favorite-button').trigger('click')

    expect(wrapper.emitted('toggle-favorite')).toEqual([[1]])
  })
})
