import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-native-testing-library';
import { buildStore } from './store';

export function renderWithRedux(component, { state } = {}) {
  const store = buildStore(state);
  const queries = render(<Provider store={store}>{component}</Provider>);

  return {
    ...queries,
    store,
  };
}
