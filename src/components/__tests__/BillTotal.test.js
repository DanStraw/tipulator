import React from 'react';
import { Provider, connect } from 'react-redux';
import store from '../../store';
import BillTotal from '../BillTotal';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

const mapState = state => {
  const { totalBill } = state;
  return { totalBill };
}

describe('<BillTotal /> component ', () => {
  test('exists and text value defaults to $0.00', async () => {
    const tree = renderer.create(
      <Provider store={store}>
        <BillTotal />
      </Provider>
    )
      .toJSON();

    console.log('tree', tree);
    expect(tree).toMatchSnapshot();
    // const { findByText } = render(component);
    // const newBillTotal = await findByText('$0.00');
    // expect(newBillTotal).toBeTruthy();
  });

  test('get component by testID', () => {
    const component = renderer.create(
      <Provider store={store}>
        <BillTotal totalBill="45.00" />
      </Provider>
    );

    // connect(mapState)(BillTotal);

    let tree = component.toJSON();
    console.log('new tree:', tree);
    expect(tree).toMatchSnapshot();

    // const { getAllByTestId } = render(component);
    // const newBillTotal = getAllByTestId('total-bill');

    // expect(newBillTotal.length).toBe(1);
  })
})