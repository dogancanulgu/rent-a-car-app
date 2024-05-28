'use client';
import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider, InputNumber } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const Profile = ({ initialValues, onFinish }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <Form name='register' initialValues={{ role: 'user', language: 'tr' }} onFinish={onFinish}>
      <FormItem
        name='name'
        rules={[
          {
            required: true,
            message: 'Please input your Name!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder='Name' />
      </FormItem>
      <FormItem
        name='surname'
        rules={[
          {
            required: true,
            message: 'Please input your Surname!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder='Surname' />
      </FormItem>
      <FormItem
        name='email'
        rules={[
          {
            type: 'email',
          },
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder='Email' />
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

      <FormItem name='language' rules={[{ required: true, message: 'Please select your Language!' }]}>
        <Select
          placeholder='Language'
          options={[
            { value: 'tr', label: <span>Türkçe</span> },
            { value: 'en', label: <span>English</span> },
          ]}
        />
      </FormItem>

      <FormItem>
        <Button type='primary' htmlType='submit' className='fullWidth'>
          Update
        </Button>
      </FormItem>
    </Form>
  );
};

export default Profile;
