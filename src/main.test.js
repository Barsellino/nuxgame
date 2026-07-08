import { beforeEach, describe, expect, it, vi } from 'vitest'

const mountMock = vi.fn()

vi.mock('./createApp', () => ({
  createAppInstance: vi.fn(() => ({
    mount: mountMock,
  })),
}))

describe('main', () => {
  beforeEach(() => {
    mountMock.mockClear()
    document.body.innerHTML = '<div id="app"></div>'
  })

  it('mounts the application', async () => {
    await import('./main')

    expect(mountMock).toHaveBeenCalledWith('#app')
  })
})
