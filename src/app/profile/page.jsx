'use client';
import React, { useEffect } from 'react';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider, Select, InputNumber, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setLoading } from '@/redux/loadingSlice';
import { useTranslation } from 'react-i18next';
import { setUser } from '@/redux/userSlice';

const Profile = () => {
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   getUserDetail();
  // }, []);

  const getUserDetail = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get('/api/user');
      await i18n.changeLanguage(response.data.data.language);
      dispatch(setUser(response.data.data));
    } catch (error) {
      message.error(t(error.response?.data.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onFinish = async (value) => {
    try {
      const response = await axios.put(`api/users/${user._id}`, value);
      message.success(t(response.data.message));
      getUserDetail();
    } catch (error) {
      message.error(t(error.response?.data.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <h1>{t('Profile')}</h1>
      <Form
        name='register'
        initialValues={{
          name: user?.name,
          surname: user?.surname,
          email: user?.email,
          language: user?.language,
        }}
        onFinish={onFinish}
      >
        <FormItem
          name='name'
          rules={[
            {
              required: true,
              message: t('Please input your Name!'),
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder={t('Name')} />
        </FormItem>
        <FormItem
          name='surname'
          rules={[
            {
              required: true,
              message: t('Please input your Surname!'),
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder={t('Surname')} />
        </FormItem>
        <FormItem
          name='email'
          rules={[
            {
              type: 'email',
            },
            {
              required: true,
              message: t('Please input your Email!'),
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder={t('Email')} disabled />
        </FormItem>
        {/* <FormItem
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} type='password' placeholder='Password' />
      </FormItem>

      <FormItem name='newPassword'>
        <Input.Password prefix={<LockOutlined />} type='password' placeholder='Password' />
      </FormItem>

      <FormItem
        name='repeatNewPassword'
        dependencies={['newPassword']}
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined />} type='password' placeholder='Password' />
      </FormItem> */}

        <FormItem name='language' rules={[{ required: true, message: t('Please select your Language!') }]}>
          <Select
            placeholder={t('Language')}
            options={[
              { value: 'tr', label: <span>{t('Türkçe')}</span> },
              { value: 'en', label: <span>{t('English')}</span> },
            ]}
          />
        </FormItem>

        <FormItem>
          <Button type='primary' htmlType='submit' className='fullWidth'>
            {t('Update')}
          </Button>
        </FormItem>
      </Form>
    </>
  );
};

export default Profile;
