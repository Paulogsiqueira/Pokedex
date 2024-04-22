import { provide } from 'vue';
import { getPokemonsName } from '../../src/service/pokemonService';
import { expect, test } from 'vitest';

provide('axios', {
  async get(url) {
    if (url === 'https://pokeapi.co/api/v2/pokemon-species/1') {
      return {
        data: {
          names: [
            { name: 'Bulbasaur', language: { name: 'en' } },
            { name: 'Bulbizarre', language: { name: 'fr' } }
          ]
        }
      };
    }
  }
});

test('getPokemonsName should return the correct name', async () => {
  const englishName = await getPokemonsName(1, { value: 'en' });
  const frenchName = await getPokemonsName(1, { value: 'fr' });

  expect(englishName).toBe('Bulbasaur');
  expect(frenchName).toBe('Bulbizarre');
});
