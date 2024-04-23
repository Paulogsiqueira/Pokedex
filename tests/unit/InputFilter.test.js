import { shallowMount } from '@vue/test-utils'
import InputFilter from '../../src/components/InputFilter.vue'
import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/vue'

const mockStore = {
  getters: {
    getLanguage: 'EN',
    getSearchOption: 'species',
  },
  commit: vi.fn(),
}

describe('InputFilter.vue', () => {
  it('renders the component and displays search options', async () => {
    const wrapper = shallowMount(InputFilter, {
      global: {
        provide: {
          store: mockStore,
        },
      },
    })
    const searchSubmitSpy = vi.spyOn(wrapper.vm, 'searchSubmit');

    const searchInput = wrapper.find('.inputFilter-input')
    const searchButton = wrapper.find('.dropdown-button')
    const dropdownOptions = wrapper.findAll('.dropdown-item')

    expect(searchInput.exists()).toBe(true)
    expect(searchButton.text()).toContain('Search')

    expect(dropdownOptions.length).toBe(4)
    expect(dropdownOptions.at(0).text()).toContain('Name')
    expect(dropdownOptions.at(1).text()).toContain('ID')
    expect(dropdownOptions.at(2).text()).toContain('Type')
    expect(dropdownOptions.at(3).text()).toContain('Specie')

    await searchInput.setValue('bulbasaur')
    await searchButton.trigger('click')


    expect(searchSubmitSpy).toHaveBeenCalled();

  })
})