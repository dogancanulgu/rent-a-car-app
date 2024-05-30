'use client';
import { useEffect, useState } from 'react';
import { Button, Flex, Table, message, Popconfirm, Empty } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { setLoading } from '@/redux/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const CarList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [carList, setCarList] = useState([]);

  const addCar = () => router.push('/cars/add');

  useEffect(() => {
    getCarList();
  }, []);

  const getCarList = async () => {
    try {
      const params = { owner: user.role == 'owner' ? user._id : null };
      dispatch(setLoading(true));
      const response = await axios.get('/api/cars', { params });
      setCarList(response.data.data);
    } catch (error) {
      message.error(t(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteCar = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.delete(`/api/car/${id}`);

      message.success(t(response.data.message));
      getCarList();
    } catch (error) {
      message.error(t(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const columns = [
    {
      title: t('Image'),
      dataIndex: 'images',
      render: (images) =>
        images?.[0] ? (
          <Image src={images[0]} alt='car' width={85} height={45} style={{ objectFit: 'cover' }} />
        ) : null,
    },
    {
      title: t('Make'),
      dataIndex: 'make',
    },
    {
      title: t('Model'),
      dataIndex: 'model',
    },
    {
      title: t('Year'),
      dataIndex: 'year',
    },
    {
      title: t('Fuel'),
      dataIndex: 'fuel',
    },
    {
      title: t('Seats'),
      dataIndex: 'seats',
    },
    {
      title: t('Doors'),
      dataIndex: 'doors',
    },
    {
      title: t('Price'),
      dataIndex: 'price',
    },
    {
      title: t('Active'),
      dataIndex: 'active',
      render: (active) => (active ? t('Yes') : t('No')),
    },
    {
      title: t('Action'),
      render: (_, record) => (
        <Flex gap={10}>
          <Button type='primary' onClick={() => router.push(`/cars/edit/${record._id}`)}>
            {t('Edit')}
          </Button>
          <Popconfirm
            title={t('Delete the car')}
            description={t('Are you sure to delete the car?')}
            okText={t('Yes')}
            cancelText={t('No')}
            onConfirm={() => deleteCar(record._id)}
          >
            <Button danger>{t('Delete')}</Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <Flex gap='middle' vertical>
      <Button type='primary' style={{ marginLeft: 'auto' }} onClick={addCar}>
        {t('Add Car')}
      </Button>
      <Table
        scroll={{ x: 'max-content' }}
        dataSource={carList}
        columns={columns}
        rowKey='_id'
        locale={{ emptyText: <Empty description={t('No Data')} /> }}
      />
    </Flex>
  );
};

export default CarList;
