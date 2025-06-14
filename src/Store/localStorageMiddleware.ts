import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './store';

export const localStorageMiddleware: Middleware<{}, RootState> = ({ getState }) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem('salesState', JSON.stringify(getState().sales));
  return result;
}; 