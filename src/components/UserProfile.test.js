import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import UserProfile from './UserProfile.vue'
import { mockUser } from '../test/fixtures'

describe('UserProfile', () => {
  it('renders user profile fields', () => {
    const wrapper = mount(UserProfile, {
      props: { user: mockUser },
    })

    expect(wrapper.text()).toContain('Leanne Graham')
    expect(wrapper.text()).toContain('Bret')
    expect(wrapper.text()).toContain('Sincere@april.biz')
    expect(wrapper.text()).toContain('1-770-736-8031 x56442')
    expect(wrapper.text()).toContain('Kulas Light')
    expect(wrapper.text()).toContain('Gwenborough')
    expect(wrapper.text()).toContain('Romaguera-Crona')
  })
})
