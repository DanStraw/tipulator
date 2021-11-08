import React from 'react';
import { Provider, connect } from 'react-redux';
import store from '../../store';
import BillTotal from '../BillTotal';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

describe('<BillTotal /> component no prop', () => {
  test('exists and text value defaults to $0.00', async () => {
    const tree = renderer.create(
      <Provider store={store}>
        <BillTotal />
      </Provider>
    )
      .toJSON();
    expect(tree.children[0].children[0]).toBe("$0.00");
  });

  describe.skip('Bill total Component with prop', () => {
    test('<BillTotal /> component with prop', () => {
      const component = renderer.create(
        <Provider store={store}>
          <BillTotal />
        </Provider>
      );

      // store.dispatch({ type: 'MANUAL', text: '45.00' });

      let tree = component.toJSON();
      // console.log('cp:', tree);
      expect(tree.children).toContain('45.00');
    })
  })
})