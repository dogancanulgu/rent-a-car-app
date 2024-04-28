'use client';
import React from 'react';
import { ConfigProvider, Spin } from 'antd';
import { usePathname } from 'next/navigation';
import { authPath } from '@/util/Util';
import Layouts from '../layouts/Layouts';
import { useSelector } from 'react-redux';

const AntdProviders = ({ children }) => {
  const pathname = usePathname();
  const { loading } = useSelector((state) => state.loading);

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
      {loading && <Spin size='large' fullscreen />}
      {authPath.includes(pathname) ? children : <Layouts>{children}</Layouts>}
    </ConfigProvider>
  );
};

export default AntdProviders;
