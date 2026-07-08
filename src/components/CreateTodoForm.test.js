import { mount, flushPromises } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { TODO_ERRORS } from '../constants/messages'
import CreateTodoForm from './CreateTodoForm.vue'

describe('CreateTodoForm', () => {
  it('shows validation error for empty fields', async () => {
    const wrapper = mount(CreateTodoForm, {
      props: { onAdd: vi.fn() },
    })

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain(TODO_ERRORS.FIELDS_REQUIRED)
  })

  it('prefills default user id', async () => {
    const wrapper = mount(CreateTodoForm, {
      props: {
        onAdd: vi.fn(),
        defaultUserId: 5,
      },
    })

    await flushPromises()

    expect(wrapper.find('input[type="number"]').element.value).toBe('5')
  })

  it('calls onAdd and clears title on success', async () => {
    const onAdd = vi.fn().mockResolvedValue(undefined)
    const wrapper = mount(CreateTodoForm, {
      props: {
        onAdd,
        defaultUserId: 1,
      },
    })

    await wrapper.find('input[type="text"]').setValue('New todo')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(onAdd).toHaveBeenCalledWith({ userId: '1', title: 'New todo' })
    expect(wrapper.find('input[type="text"]').element.value).toBe('')
    expect(wrapper.find('input[type="number"]').element.value).toBe('1')
  })

  it('shows error when onAdd fails', async () => {
    const onAdd = vi.fn().mockRejectedValue(new Error('fail'))
    const wrapper = mount(CreateTodoForm, {
      props: {
        onAdd,
        defaultUserId: 1,
      },
    })

    await wrapper.find('input[type="text"]').setValue('New todo')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain(TODO_ERRORS.CREATE_FAILED)
  })

  it('clears user id after submit when no default user id', async () => {
    const onAdd = vi.fn().mockResolvedValue(undefined)
    const wrapper = mount(CreateTodoForm, {
      props: { onAdd },
    })

    await wrapper.find('input[type="number"]').setValue('2')
    await wrapper.find('input[type="text"]').setValue('New todo')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.find('input[type="number"]').element.value).toBe('')
  })

  it('updates default user id when prop changes', async () => {
    const wrapper = mount(CreateTodoForm, {
      props: {
        onAdd: vi.fn(),
        defaultUserId: 1,
      },
    })

    await wrapper.setProps({ defaultUserId: 7 })
    await flushPromises()

    expect(wrapper.find('input[type="number"]').element.value).toBe('7')
  })
})
