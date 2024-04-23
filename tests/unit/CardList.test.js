import { shallowMount } from '@vue/test-utils'
import { describe, it, vi } from 'vitest'
import CardList from '../../src/components/CardList.vue'


  const getPoke = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
    { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
    { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
    { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
    { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/' },
    { name: 'metapod', url: 'https://pokeapi.co/api/v2/pokemon/11/' },
    { name: 'butterfree', url: 'https://pokeapi.co/api/v2/pokemon/12/' },
    { name: 'weedle', url: 'https://pokeapi.co/api/v2/pokemon/13/' },
    { name: 'kakuna', url: 'https://pokeapi.co/api/v2/pokemon/14/' },
    { name: 'beedrill', url: 'https://pokeapi.co/api/v2/pokemon/15/' },
    { name: 'pidgey', url: 'https://pokeapi.co/api/v2/pokemon/16/' },
    { name: 'pidgeotto', url: 'https://pokeapi.co/api/v2/pokemon/17/' },
    { name: 'pidgeot', url: 'https://pokeapi.co/api/v2/pokemon/18/' },
    { name: 'rattata', url: 'https://pokeapi.co/api/v2/pokemon/19/' },
    { name: 'raticate', url: 'https://pokeapi.co/api/v2/pokemon/20/' }
  ]

const mockStore = {
  getters: {
    getPokemonsListing: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
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
    const searchSubmitSpy = vi.spyOn(getPoke, 'getPokemons');
    // Espera que o componente esteja renderizado
    await wrapper.vm.$nextTick()

    // Verifica se a lista de cartas foi renderizada corretamente
    const cards = wrapper.findAllComponents({ name: 'Card' })
    expect(cards.length).toBe(mockStore.getters.getPokemonsListing.length)
  })
})
