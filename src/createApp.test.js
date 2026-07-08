import { describe, expect, it } from 'vitest'
import { createAppInstance } from './createApp'

describe('createAppInstance', () => {
  it('creates app with router installed', () => {
    const app = createAppInstance()

    expect(app.config.globalProperties.$router).toBeDefined()
    expect(app.config.globalProperties.$route).toBeDefined()
  })
})
