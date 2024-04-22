import { shallowMount } from '@vue/test-utils'
import { describe, it, vi } from 'vitest'
import CardList from '../../src/components/CardList.vue'

const mockStore = {
  getters: {
    getPokemonsListing: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      // Adicione mais Pokémon conforme necessário para o teste
    ],
    getPokemonsResearched: [],
  },
  commit: vi.fn(),
}

describe('CardList.vue', () => {
  it('renders the list of cards with the correct content', async () => {
    const wrapper = shallowMount(CardList, {
      global: {
        provide: {
          store: mockStore,
        },
      },
    })

    // Espera que o componente esteja renderizado
    await wrapper.vm.$nextTick()

    // Verifica se a lista de cartas foi renderizada corretamente
    const cards = wrapper.findAllComponents({ name: 'Card' })
    expect(cards.length).toBe(mockStore.getters.getPokemonsListing.length)
  })
})
