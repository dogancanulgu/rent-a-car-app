import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, Space, message, theme } from 'antd';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/userSlice';
import { setLoading } from '@/redux/loadingSlice';

const { Header, Content, Footer } = Layout;
const items = [
  // {
  //   key: 0,
  //   label: 'user',
  // },
  // {
  //   key: 1,
  //   label: 'car',
  // },
];

const Layouts = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get('/api/user');
      dispatch(setUser(response.data.data));
    } catch (error) {
      message.error(error.response.data.message || error.message);
      // if there is an error to get the user info, force to user to logout or redirect to login page
      logoutUser('You are not authorized to access this page. Please login again.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logoutUser = async (redirectMessage) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get('/api/auth/logout');
      message.success(redirectMessage || response.data.message);
      router.push('/login');
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Image
          src='/logo-for-rent-a-car.jpg'
          alt='Company Logo'
          width='50'
          height='25'
          style={{ cursor: 'pointer' }}
          onClick={() => router.push('/')}
        />
        ;
        <Menu
          theme='dark'
          mode='horizontal'
          // defaultSelectedKeys={['0']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        {user && (
          <div style={{ display: 'flex', gap: '10px', color: '#ffffff' }}>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => router.push('/profile')}
            >{`${user.name} ${user.surname}`}</div>
            <div style={{ cursor: 'pointer' }} onClick={logoutUser}>
              <i class='ri-logout-box-r-line' />
            </div>
          </div>
        )}
      </Header>
      <Content style={{ padding: '0 48px' }}>
        {/* <Breadcrumb
          style={{
            margin: '16px 0',
          }}
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        /> */}
        {/* <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        > */}
        {children}
        {/* </div> */}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created by Doğancan Ülgü ©{new Date().getFullYear()}</Footer>
    </Layout>
  );
};

export default Layouts;
