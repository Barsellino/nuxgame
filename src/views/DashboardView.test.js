import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { getActivePinia } from 'pinia'
import DashboardView from './DashboardView.vue'
import CreateTodoForm from '../components/CreateTodoForm.vue'
import TodoFilters from '../components/TodoFilters.vue'
import * as api from '../api/jsonplaceholder'
import { TODO_ERRORS } from '../constants/messages'
import { STORAGE_KEYS } from '../constants/storage'
import { mockTodos, mockUser } from '../test/fixtures'
import { renderWithRouter } from '../test/renderWithRouter'

describe('DashboardView', () => {
  beforeEach(() => {
    sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(mockUser))
  })

  it('loads and renders todos', async () => {
    vi.spyOn(api, 'fetchTodos').mockResolvedValue(mockTodos)

    const { wrapper } = await renderWithRouter(DashboardView, {
      routes: [
        { path: '/', component: { template: '<div>Login</div>' } },
        { path: '/dashboard', component: DashboardView },
      ],
      initialPath: '/dashboard',
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Dashboard')
    expect(wrapper.text()).toContain('Leanne Graham')
    expect(wrapper.text()).toContain('delectus aut autem')
  })

  it('updates filters from sidebar controls', async () => {
    vi.spyOn(api, 'fetchTodos').mockResolvedValue(mockTodos)

    const { wrapper } = await renderWithRouter(DashboardView, {
      routes: [{ path: '/dashboard', component: DashboardView }],
      initialPath: '/dashboard',
    })

    await flushPromises()

    const filters = wrapper.findComponent(TodoFilters)
    await filters.findAll('select')[0].setValue('completed')
    await filters.findAll('select')[1].setValue('1')
    await filters.find('input[type="search"]').setValue('quis')
    await flushPromises()

    expect(wrapper.text()).toContain('quis ut nam facilis')
    expect(wrapper.text()).not.toContain('delectus aut autem')
  })

  it('shows loading state', async () => {
    vi.spyOn(api, 'fetchTodos').mockReturnValue(new Promise(() => {}))

    const { wrapper } = await renderWithRouter(DashboardView, {
      routes: [{ path: '/dashboard', component: DashboardView }],
      initialPath: '/dashboard',
    })

    expect(wrapper.text()).toContain('Loading todos...')
  })

  it('shows error state when loading fails', async () => {
    vi.spyOn(api, 'fetchTodos').mockRejectedValue(new Error('fail'))

    const { wrapper } = await renderWithRouter(DashboardView, {
      routes: [{ path: '/dashboard', component: DashboardView }],
      initialPath: '/dashboard',
    })

    await flushPromises()

    expect(wrapper.text()).toContain(TODO_ERRORS.LOAD_FAILED)
  })

  it('logs out and redirects to login', async () => {
    vi.spyOn(api, 'fetchTodos').mockResolvedValue(mockTodos)

    const { wrapper, router } = await renderWithRouter(DashboardView, {
      routes: [
        { path: '/', component: { template: '<div>Login</div>' } },
        { path: '/dashboard', component: DashboardView },
      ],
      initialPath: '/dashboard',
    })

    await flushPromises()
    await wrapper.find('.logout-button').trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.path).toBe('/')
    expect(sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER)).toBeNull()
  })

  it('adds todo through form handler', async () => {
    vi.spyOn(api, 'fetchTodos').mockResolvedValue(mockTodos)
    vi.spyOn(api, 'createTodo').mockResolvedValue({
      id: 201,
      userId: 1,
      title: 'Added todo',
      completed: false,
    })

    const { wrapper } = await renderWithRouter(DashboardView, {
      routes: [{ path: '/dashboard', component: DashboardView }],
      initialPath: '/dashboard',
    })

    await flushPromises()

    const form = wrapper.findComponent(CreateTodoForm)
    await form.find('input[type="number"]').setValue('1')
    await form.find('input[placeholder="Todo title"]').setValue('Added todo')
    await form.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(api.createTodo).toHaveBeenCalled()
    expect(wrapper.text()).toContain('Added todo')
  })

  it('rejects add todo through form handler', async () => {
    vi.spyOn(api, 'fetchTodos').mockResolvedValue(mockTodos)
    vi.spyOn(api, 'createTodo').mockRejectedValue(new Error('fail'))

    const { wrapper } = await renderWithRouter(DashboardView, {
      routes: [{ path: '/dashboard', component: DashboardView }],
      initialPath: '/dashboard',
    })

    await flushPromises()

    const form = wrapper.findComponent(CreateTodoForm)
    await form.find('input[type="number"]').setValue('1')
    await form.find('input[placeholder="Todo title"]').setValue('Broken todo')
    await form.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain(TODO_ERRORS.CREATE_FAILED)
  })

  it('does not render when user is missing', async () => {
    sessionStorage.clear()

    const wrapper = mount(DashboardView, {
      global: {
        plugins: [
          (await import('vue-router')).createRouter({
            history: (await import('vue-router')).createWebHistory(),
            routes: [{ path: '/dashboard', component: DashboardView }],
          }),
          getActivePinia(),
        ],
      },
    })

    expect(wrapper.find('.dashboard').exists()).toBe(false)
  })
})
