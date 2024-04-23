'use client';
import React from 'react';
import { Divider, message } from 'antd';
import Login from '@/components/login/Login';
import axios from 'axios';

const LoginPage = () => {
  const onFinish = async (values) => {
    try {
      const response = await axios.post('/api/user/login', values);
      message.success(response.data.message);
    } catch (error) {
      message.error(error.response.data.message || error.message);
    }
  };

  return (
    <div className='flex-c-c h-full'>
      <div className='w-500 p-20' style={{ border: '1px solid black' }}>
        <h1>Login</h1>
        <Divider />
        <Login onFinish={onFinish} />
      </div>
    </div>
  );
};

export default LoginPage;
