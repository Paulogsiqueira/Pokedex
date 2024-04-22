import { shallowMount } from '@vue/test-utils'
import App from '../../src/App.vue'
import { describe, expect, it } from 'vitest'
import InputFilter from '../../src/components/InputFilter.vue'
import CardList from '../../src/components/CardList.vue'

const mockStore = {
  getters: {
    getLanguage: () => 'en',
  },
}

describe('App.vue', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(App, {
      global: {
        provide: {
          store: mockStore, 
        },
      },
    })

    expect(wrapper.html()).toContain('Pokedex') 
    expect(wrapper.findComponent(InputFilter)).toBeTruthy() 
    expect(wrapper.findComponent(CardList)).toBeTruthy() 
  })
})