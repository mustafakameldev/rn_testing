// LoginScreen.test.tsx
import React from 'react';
import '@testing-library/jest-native/extend-expect';
import { fireEvent } from 'react-native-testing-library';
import { renderWithRedux } from '../test-utils/render';
import { login as mockLoginApi } from 'api';
 
function renderLoginScreen() {
  return renderWithRedux(<LoginScreen />);
};
 
test('User can login', async () => {
  mockLoginApi.mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      data: {
        user: { name: 'Maciej' },
      }
    }),
  );
 
  const screen = renderLoginScreen();
 
  fireEvent.changeText(screen.getByPlaceholder(/Username/i), 'user@callstack.com');
  fireEvent.changeText(screen.getByPlaceholder(/Password/i), 'p@ssw0rd');
  fireEvent.press(screen.getByText('Login'));
 
  expect(mockLoginApi).toHaveBeenCalledTimes(1);
  expect(mockLoginApi).toHaveBeenCalledWith({ 
    username: 'user@callstack.com', 
    password: 'p@ssw0rd',
  });
 
  // In real app this would probably be some navigation transition, but here we keep it simple. 
  // We use findBy query because the API call and transition are asynchronous.
  expect(await screen.findByText('Welcome back Maciej')).toBeTruthy();
});
 
//We can also add test for negative scenarios, in which case we would mock our API call to return error result.
 
// LoginScreen.test.tsx (continued)
test('User cannot login with wrong credentials', async () => {
  mockLoginApi.mockImplementationOnce(() =>
    Promise.resolve({
      status: 401,
      data: {
        error: { 'Invalid username or password' }
      }
    }),
  );
 
  const screen = renderLoginScreen();
 
  fireEvent.changeText(screen.getByPlaceholder(/Username/i), 'user@callstack.com');
  fireEvent.changeText(screen.getByPlaceholder(/Password/i), 'Incorrect Password');
  fireEvent.press(screen.getByText('Login'));
 
  expect(mockLoginApi).toHaveBeenCalledTimes(1);
  expect(mockLoginApi).toHaveBeenCalledWith({ 
    username: 'user@callstack.com', 
    password: 'Incorrect Password',
  });
  expect(await screen.findByText('Invalid username or password')).toBeTruthy();
});