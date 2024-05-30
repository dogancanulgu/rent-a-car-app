import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, Space, message, theme } from 'antd';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/userSlice';
import { setLoading } from '@/redux/loadingSlice';
import { useTranslation } from 'react-i18next';

const { Header, Content, Footer } = Layout;

const { Item } = Menu;

const AuthProvider = ({ children }) => {
  const { t, i18n } = useTranslation();

  const languageItems = [
    { key: 1, language: 'tr', text: t('Türkçe') },
    { key: 2, language: 'en', text: t('English') },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Image src='/logo-for-rent-a-car.jpg' alt='Company Logo' width='50' height='25' />

        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['1']}
          style={{ marginLeft: 'auto', minWidth: 0 }}
        >
          <Item key='1' onClick={() => i18n.changeLanguage('tr')}>
            {t('Türkçe')}
          </Item>
          <Item key='2' onClick={() => i18n.changeLanguage('en')}>
            {t('English')}
          </Item>
        </Menu>
      </Header>
      <Content style={{ padding: '16px 48px', overflowX: 'auto' }}>{children}</Content>
    </Layout>
  );
};

export default AuthProvider;
