import { vi, describe, it } from "vitest";
import { shallowMount } from '@vue/test-utils'
import Card from '../../src/components/Card.vue'
import { getPokemonsName } from "../../src/service/pokemonService";

// Mock para getPokemonsName (opcional)
vi.mock("../service/pokemonService", () => ({
  getPokemonsName: vi.fn(() => "Bulbasaur"),
}));

describe("PokemonCard.vue", () => {
  it("renders the component with basic Pokemon information", async () => {
    const mockPokemon = {
      url: "https://example.com/pokemon/1/", // Sample URL
    };

    const wrapper = shallowMount(Card, {
      props: {
        pokemon: mockPokemon,
      },
    });

    await wrapper.vm.$nextTick(); // Wait for asynchronous data fetching

    expect(wrapper.find(".card-id").text()).toBe("#1"); // Assuming ID from URL
    expect(wrapper.find(".card h2").text()).toBe("Bulbasaur"); // Mocked name
    expect(wrapper.find(".card-image img").attributes("src")).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    );
  });

  it("opens and closes the modal", async () => {
    const mockPokemon = {
      url: "https://example.com/pokemon/1/", // Sample URL
    };

    const wrapper = shallowMount(Card, {
      props: {
        pokemon: mockPokemon,
      },
    });

    expect(wrapper.findComponent(Modal).exists()).toBe(false); // Modal hidden initially

    wrapper.find(".card button").trigger("click"); // Click "more info" button

    await wrapper.vm.$nextTick(); // Wait for modal to show

    expect(wrapper.findComponent(Modal).exists()).toBe(true); // Modal should be shown

    wrapper.findComponent(Modal).vm.$emit("closeCard"); // Emit close event

    await wrapper.vm.$nextTick(); // Wait for modal to close

    expect(wrapper.findComponent(Modal).exists()).toBe(false); // Modal should be hidden
  });

  // (Optional) Test language switching behavior
  it("updates Pokemon name based on language change", async () => {
    const mockPokemon = {
      url: "https://example.com/pokemon/1/", // Sample URL
    };

    const wrapper = shallowMount(Card, { // Use mount for store access
      props: {
        pokemon: mockPokemon,
      },
    });

    // Simulate store update (replace with actual store access)
    wrapper.vm.$store.commit("setLanguage", "fr"); // Change language

    await wrapper.vm.$nextTick(); // Wait for updates

    expect(wrapper.find(".card h2").text()).toBe("Bulbizarre"); // French name (replace with actual logic)
  });
});
