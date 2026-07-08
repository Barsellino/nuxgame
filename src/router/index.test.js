import { describe, expect, it } from 'vitest'
import { STORAGE_KEYS } from '../constants/storage'
import { mockUser } from '../test/fixtures'
import router, { routes } from './index'

describe('router', () => {
  it('defines login and dashboard routes', () => {
    const routeNames = router.getRoutes().map((route) => route.name)
    expect(routeNames).toContain('login')
    expect(routeNames).toContain('dashboard')
  })

  it('lazy-loads dashboard component', async () => {
    const dashboardRoute = routes.find((route) => route.name === 'dashboard')
    const loaded = await dashboardRoute.component()

    expect(loaded.default).toBeDefined()
  })

  it('redirects unauthenticated users away from dashboard', async () => {
    await router.push('/dashboard')
    await router.isReady()

    expect(router.currentRoute.value.path).toBe('/')
  })

  it('allows authenticated users to open dashboard', async () => {
    sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(mockUser))

    await router.push('/dashboard')
    await router.isReady()

    expect(router.currentRoute.value.path).toBe('/dashboard')
  })
})
