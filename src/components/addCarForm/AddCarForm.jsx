import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider, InputNumber } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const AddCarForm = ({ initialValues, onFinish, isEdit }) => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{isEdit ? t('Edit Car') : t('Add Car')}</h1>
      <Form name='addCarForm' {...formItemLayout} initialValues={initialValues} onFinish={onFinish}>
        <FormItem label={t('Make')} name='make'>
          <Input placeholder='make' disabled />
        </FormItem>
        <FormItem label={t('Model')} name='model'>
          <Input placeholder='model' disabled />
        </FormItem>
        <FormItem label={t('Year')} name='year'>
          <Input placeholder='year' disabled />
        </FormItem>
        <FormItem label={t('Fuel')} name='fuel'>
          <Input placeholder='fuel' disabled />
        </FormItem>
        <FormItem label={t('Seats')} name='seats'>
          <Input placeholder='seats' disabled />
        </FormItem>
        <FormItem label={t('Doors')} name='doors'>
          <Input placeholder='doors' disabled />
        </FormItem>
        <FormItem
          label={t('Description')}
          name='description'
          rules={[
            {
              required: true,
              message: t('Please input description of your car!'),
            },
          ]}
        >
          <Input placeholder='price' />
        </FormItem>
        <FormItem
          label={t('Price')}
          name='price'
          rules={[
            {
              required: true,
              message: t('Please input daily price of your car!'),
            },
          ]}
        >
          <Input placeholder='price' />
        </FormItem>
        <FormItem
          label={t('Images')}
          name='images'
          rules={[
            {
              required: true,
              message: t('Please add image url of your car!'),
            },
          ]}
        >
          <Input placeholder='image' />
        </FormItem>
        <FormItem>
          <FormItem label={t('Active')} name='active' valuePropName='checked' noStyle>
            <Checkbox>{t('Active')}</Checkbox>
          </FormItem>
        </FormItem>

        <FormItem>
          <Button type='primary' htmlType='submit' className='fullWidth'>
            {isEdit ? t('Edit Car') : t('Add Car')}
          </Button>
        </FormItem>
      </Form>
    </>
  );
};

export default AddCarForm;
