'use client';
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider, message } from 'antd';
import Register from '@/components/register/Register';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loadingSlice';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post('/api/auth/register', values);
      message.success(t(response.data.message));
      router.push('/login');
    } catch (error) {
      message.error(t(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className='flex-c-c fullHeight'>
      <div className='w-500 p-20' style={{ border: '1px solid black' }}>
        <h1 suppressHydrationWarning >{t('Register')}</h1>
        <Divider />
        <Register onFinish={onFinish} />
      </div>
    </div>
  );
};

export default RegisterPage;
