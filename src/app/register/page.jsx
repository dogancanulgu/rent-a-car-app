'use client';
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider, message } from 'antd';
import Register from '@/components/register/Register';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post('/api/auth/register', values);
      message.success(response.data.message);
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className='flex-c-c h-full'>
      <div className='w-500 p-20' style={{ border: '1px solid black' }}>
        <h1>Register</h1>
        <Divider />
        <Register onFinish={onFinish} />
      </div>
    </div>
  );
};

export default RegisterPage;
