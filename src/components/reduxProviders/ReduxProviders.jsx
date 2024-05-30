'use client';
import React from 'react';
import store from '@/redux/store';
import { Provider } from 'react-redux';
import '@/i18n'

const ReduxProviders = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProviders;
