import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import BillTotal from '../BillTotal';
import { render } from '@testing-library/react-native';


describe('<BillTotal /> component ', () => {
  test('exists and text value defaults to $0.00', async () => {
    const component = (
      <Provider store={store}>
        <BillTotal />
      </Provider>
    );
    const { findByText } = render(component);
    const newBillTotal = await findByText('$0.00');
    expect(newBillTotal).toBeTruthy();
  });

  test('get component by testID', () => {

    const component = (
      <Provider store={store}>
        <BillTotal totalBill={45} />
      </Provider>
    )

    const { getAllByTestId } = render(component);
    const newBillTotal = getAllByTestId('total-bill');

    expect(newBillTotal.length).toBe(1);
  })
})