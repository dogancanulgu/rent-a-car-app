'use client';
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider } from 'antd';
import Register from '@/components/register/Register';

const RegisterPage = () => {
  const onFinish = (values) => console.log(values);

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
