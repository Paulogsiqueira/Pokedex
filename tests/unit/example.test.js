/**
 * @vitest-enviroment happy-dom
 */

import { mount } from '@vue/test-utils';
import InputFilter from "./src/components/InputFilter.vue";
import { describe, expect, it } from 'vitest';

describe('InputFilter', () => {
  it('Testing the input and the submit button', async () => {
    const wrapper = mount(InputFilter);
    const input = wrapper.find('.inputFilter-input');
    const button = wrapper.find('.dropdown-button');

    await input.setValue('Pikachu');
    await button.trigger('click');

    expect(wrapper.emitted().searchSubmit).toBeTruthy();
  });
});
