'use client';
import React, { useEffect, useState } from 'react';
import { Descriptions, Flex, Image, DatePicker, Button, message, Table, Popconfirm, Empty } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loadingSlice';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

const UserPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get('/api/users');
      setUsers(response.data.data);
    } catch (error) {
      message.error(t(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const changeUserActivation = async (id, active) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.put(`/api/users/${id}`, { active: !active });
      message.success(t(response.data.message));
      getAllUsers();
    } catch (error) {
      message.error(t(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const columns = [
    {
      title: t('User Id'),
      dataIndex: '_id',
    },
    {
      title: t('Email'),
      dataIndex: 'email',
    },
    {
      title: t('Name'),
      dataIndex: 'name',
    },
    {
      title: t('Surname'),
      dataIndex: 'surname',
    },
    {
      title: t('Language'),
      dataIndex: 'language',
    },
    {
      title: t('Created Date'),
      dataIndex: 'createdAt',
      render: (time) => dayjs(time).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      title: t('Updated Date'),
      dataIndex: 'updatedAt',
      render: (time) => dayjs(time).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      title: t('Active'),
      dataIndex: 'active',
      render: (active) => (active ? t('Yes') : t('No')),
    },
    {
      title: t('Action'),
      render: (_, { _id, active }) => (
        <Popconfirm
          title={t('Change the user activation')}
          description={t('Are you sure to change user activation?')}
          okText={t('Yes')}
          cancelText={t('No')}
          onConfirm={() => changeUserActivation(_id, active)}
        >
          <Button danger>{active ? t('Block') : t('Approve')}</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <h1>{t('All Users')}</h1>
      <Table
        scroll={{ x: 'max-content' }}
        dataSource={users}
        columns={columns}
        rowKey='_id'
        locale={{ emptyText: <Empty description={t('No Data')} /> }}
      />
    </>
  );
};

export default UserPage;
