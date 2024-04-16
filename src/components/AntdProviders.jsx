'use client';
import { ConfigProvider } from 'antd';
import React from 'react';

const AntdProviders = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: '#00b96b',
          // borderRadius: 2,

          // Alias Token
          // colorBgContainer: '#f6ffed',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdProviders;
