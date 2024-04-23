import { vi, describe, it } from "vitest";
import { shallowMount } from '@vue/test-utils'
import Card from '../../src/components/Card.vue'

vi.mock("../service/pokemonService", () => ({
  getPokemonsName: vi.fn(() => "Bulbasaur"),
}));

const mockStore = {
  getters: {
    getLanguage: 'EN'
  },
  commit: vi.fn(),
}

const mockPokemon = { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
describe("PokemonCard.vue", () => {
  it("renders the component with basic Pokemon information", async () => {

    const wrapper = shallowMount(Card, {
      props: {
        pokemon: mockPokemon,
      },
      store: mockStore,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".card-id").text()).toBe("#1");
    expect(wrapper.find(".card h2").text()).toBe("Bulbasaur");
    expect(wrapper.find(".card-image img").attributes("src")).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    );
  });
});
