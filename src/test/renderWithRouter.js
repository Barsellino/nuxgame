import { mount } from '@vue/test-utils'
import { getActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

export function createTestRouter(routes) {
  return createRouter({
    history: createWebHistory(),
    routes,
  })
}

export async function renderWithRouter(component, options = {}) {
  const { routes = [], initialPath = '/', ...mountOptions } = options

  const router = createTestRouter(routes.length ? routes : [{ path: '/', component }])

  if (initialPath !== '/') {
    await router.push(initialPath)
    await router.isReady()
  }

  const pinia = getActivePinia()
  const plugins = pinia ? [router, pinia] : [router]

  const wrapper = mount(component, {
    global: {
      plugins,
      ...mountOptions.global,
    },
    ...mountOptions,
  })

  return { wrapper, router }
}
