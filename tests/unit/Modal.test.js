import { shallowMount } from '@vue/test-utils';
import Modal from '../../src/components/Modal.vue';
import { describe, expect, it, vi } from 'vitest';

const mockStore = {
  getters: {
    getLanguage: 'EN',
  },
  commit: vi.fn(),
};

describe('Modal.vue', () => {
  it('renders the modal component with the correct content', async () => {
    const closeCardMock = vi.fn();
    const wrapper = shallowMount(Modal, {
      global: {
        provide: {
          store: mockStore,
        },
      },
      props: {
        pokemonId: '1',
        urlSvg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        showModal: true,
        closeCard: closeCardMock,
      },
    });

    expect(wrapper.find('.card-title').text()).toBe('Bulbasaur');
    expect(wrapper.find('.card-img img').attributes('src')).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
    );
    expect(wrapper.findAll('.card-sprites__list img')).toHaveLength(4);
    expect(wrapper.findAll('.card-type__item')).toHaveLength(2);
    expect(wrapper.findAll('.card-evolution__list li')).toHaveLength(3);
    expect(wrapper.findAll('.card-list__list li')).toHaveLength(2);

    await wrapper.find('.card-button button').trigger('click');
    expect(closeCardMock).toHaveBeenCalled();
  });

});