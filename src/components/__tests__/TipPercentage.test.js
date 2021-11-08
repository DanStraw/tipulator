import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import TipPercentage from '../TipPercentage';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';

describe('<TipPercentage /> component', () => {
  describe('default valude', () => {
    test('default value is 15%', () => {
      const tree = renderer.create(
        <Provider store={store}>
          <TipPercentage />
        </Provider>
      ).toJSON();
      expect(tree.children[0].props.value).toBe("15.0");
    })
  });

  describe('updatedpercentage', () => {
    test('expect 20%', () => {
      const textChangeMock = jest.fn();
      const component = render(
        <Provider store={store}>
          <TipPercentage
            onChangeText={textChangeMock} />
        </Provider>
      )

      fireEvent.changeText(component.getByTestId("tipPercentageComponent"), "20.0");

      expect(textChangeMock).toHaveBeenCalledWith("20.0");
    })
  })
})