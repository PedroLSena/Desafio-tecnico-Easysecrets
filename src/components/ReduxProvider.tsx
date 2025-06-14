"use client";

import { Provider } from 'react-redux';
import { store } from '../Store/store';
import React from 'react';

interface ReduxProviderProps {
  children: React.ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider; 