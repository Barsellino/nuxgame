import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TodoFilters from './TodoFilters.vue'

describe('TodoFilters', () => {
  const baseProps = {
    statusFilter: 'all',
    userIdFilter: 'all',
    searchQuery: '',
    userIds: [1, 2],
  }

  it('emits status filter updates', async () => {
    const wrapper = mount(TodoFilters, { props: baseProps })

    await wrapper.findAll('select')[0].setValue('completed')

    expect(wrapper.emitted('update:statusFilter')).toEqual([['completed']])
  })

  it('emits user id filter updates', async () => {
    const wrapper = mount(TodoFilters, { props: baseProps })

    await wrapper.findAll('select')[1].setValue('2')

    expect(wrapper.emitted('update:userIdFilter')).toEqual([['2']])
  })

  it('emits search query updates', async () => {
    const wrapper = mount(TodoFilters, { props: baseProps })

    await wrapper.find('input[type="search"]').setValue('todo')

    expect(wrapper.emitted('update:searchQuery')).toEqual([['todo']])
  })
})
