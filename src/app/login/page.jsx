'use client';
import React from 'react';
import { Divider, message } from 'antd';
import Login from '@/components/login/Login';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loadingSlice';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post('/api/auth/login', values);
      message.success(response.data.message);
      router.push('/');
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(setLoading(false));
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
