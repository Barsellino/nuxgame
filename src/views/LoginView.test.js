import { mount, flushPromises } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { LOGIN_ERRORS } from '../constants/auth'
import LoginView from './LoginView.vue'
import * as api from '../api/jsonplaceholder'
import { mockUser } from '../test/fixtures'
import { renderWithRouter } from '../test/renderWithRouter'

describe('LoginView', () => {
  it('filters username input to letters only', async () => {
    const { wrapper } = await renderWithRouter(LoginView, {
      routes: [
        { path: '/', component: LoginView },
        { path: '/dashboard', component: { template: '<div>Dashboard</div>' } },
      ],
    })

    const usernameInput = wrapper.find('#username').element
    usernameInput.value = 'abc123!@#'
    usernameInput.dispatchEvent(new Event('input', { bubbles: true }))
    await flushPromises()

    expect(wrapper.find('#username').element.value).toBe('abc')
  })

  it('filters letters out of phone input', async () => {
    const { wrapper } = await renderWithRouter(LoginView, {
      routes: [
        { path: '/', component: LoginView },
        { path: '/dashboard', component: { template: '<div>Dashboard</div>' } },
      ],
    })

    const phoneInput = wrapper.find('#phone').element
    phoneInput.value = '1-770-abc-8031'
    phoneInput.dispatchEvent(new Event('input', { bubbles: true }))
    await flushPromises()

    expect(wrapper.find('#phone').element.value).toBe('1-770--8031')
  })

  it('redirects to dashboard on successful login', async () => {
    vi.spyOn(api, 'fetchUsers').mockResolvedValue([mockUser])
    const { wrapper, router } = await renderWithRouter(LoginView, {
      routes: [
        { path: '/', component: LoginView },
        { path: '/dashboard', component: { template: '<div>Dashboard</div>' } },
      ],
    })

    await wrapper.find('#username').setValue('Bret')
    await wrapper.find('#phone').setValue('1-770-736-8031')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(router.currentRoute.value.path).toBe('/dashboard')
  })

  it('shows invalid login error on failed login', async () => {
    vi.spyOn(api, 'fetchUsers').mockResolvedValue([mockUser])
    const { wrapper } = await renderWithRouter(LoginView, {
      routes: [{ path: '/', component: LoginView }],
    })

    await wrapper.find('#username').setValue('Wrong')
    await wrapper.find('#phone').setValue('000')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain(LOGIN_ERRORS.INVALID)
  })

  it('disables submit button while submitting', async () => {
    let resolveFetch
    vi.spyOn(api, 'fetchUsers').mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve
      }),
    )

    const { wrapper } = await renderWithRouter(LoginView, {
      routes: [{ path: '/', component: LoginView }],
    })

    await wrapper.find('#username').setValue('Bret')
    await wrapper.find('#phone').setValue('1-770-736-8031')

    const submitPromise = wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.login-button').attributes('disabled')).toBeDefined()

    resolveFetch([mockUser])
    await submitPromise
    await flushPromises()

    expect(wrapper.find('.login-button').attributes('disabled')).toBeUndefined()
  })
})
