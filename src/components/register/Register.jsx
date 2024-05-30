import React from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Register = ({ onFinish }) => {
  const { t } = useTranslation();

  return (
    <Form name='register' initialValues={{ role: 'user', language: 'tr' }} onFinish={onFinish}>
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
        <Input prefix={<MailOutlined />} placeholder={t('Email')} />
      </FormItem>
      <FormItem
        name='password'
        rules={[
          {
            required: true,
            message: t('Please input your Password!'),
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} type='password' placeholder={t('Password')} />
      </FormItem>

      <Form.Item name='role' rules={[{ required: true, message: t('Please select your Role!') }]}>
        <Select
          placeholder={t('Role')}
          options={[
            { value: 'user', label: <span>{t('User')}</span> },
            { value: 'owner', label: <span>{t('Owner')}</span> },
          ]}
        />
      </Form.Item>

      <Form.Item name='language' rules={[{ required: true, message: t('Please select your Language!') }]}>
        <Select
          placeholder={t('Language')}
          options={[
            { value: 'tr', label: <span>{t('Türkçe')}</span> },
            { value: 'en', label: <span>{t('English')}</span> },
          ]}
        />
      </Form.Item>

      <FormItem>
        <Button type='primary' htmlType='submit' className='fullWidth'>
          {t('Register')}
        </Button>
      </FormItem>
      <Link href='/login' className='fl-r'>
        {t('Login now!')}
      </Link>
    </Form>
  );
};

export default Register;
