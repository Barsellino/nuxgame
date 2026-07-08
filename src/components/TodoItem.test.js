import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TodoItem from './TodoItem.vue'
import { mockTodos } from '../test/fixtures'

describe('TodoItem', () => {
  it('renders todo details', () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: mockTodos[0],
        isFavorite: false,
      },
    })

    expect(wrapper.text()).toContain('#1')
    expect(wrapper.text()).toContain('User 1')
    expect(wrapper.text()).toContain('delectus aut autem')
    expect(wrapper.text()).toContain('Uncompleted')
  })

  it('renders completed state', () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: mockTodos[1],
        isFavorite: false,
      },
    })

    expect(wrapper.text()).toContain('Completed')
    expect(wrapper.find('.todo-item').classes()).toContain('completed')
  })

  it('emits toggle-favorite on button click', async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: mockTodos[0],
        isFavorite: true,
      },
    })

    expect(wrapper.find('.favorite-button').classes()).toContain('active')
    expect(wrapper.find('.favorite-button').attributes('aria-pressed')).toBe('true')

    await wrapper.find('.favorite-button').trigger('click')

    expect(wrapper.emitted('toggle-favorite')).toEqual([[1]])
  })
})
