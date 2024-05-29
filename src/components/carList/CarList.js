'use client';
import { useEffect, useState } from 'react';
import { Button, Flex, Table, message, Popconfirm } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { setLoading } from '@/redux/loadingSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const CarList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [carList, setCarList] = useState([]);

  const addCar = () => router.push('/cars/add');

  useEffect(() => {
    getCarList();
  }, []);

  const getCarList = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get('/api/cars');
      setCarList(response.data.data);
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteCar = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.delete(`/api/car/${id}`);

      message.success(response.data.message);
      getCarList();
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      render: (images) =>
        images?.[0] ? (
          <Image src={images[0]} alt='car' width={85} height={45} style={{ objectFit: 'cover' }} />
        ) : null,
    },
    {
      title: 'Make',
      dataIndex: 'make',
    },
    {
      title: 'Model',
      dataIndex: 'model',
    },
    {
      title: 'Year',
      dataIndex: 'year',
    },
    {
      title: 'Fuel',
      dataIndex: 'fuel',
    },
    {
      title: 'Seats',
      dataIndex: 'seats',
    },
    {
      title: 'Doors',
      dataIndex: 'doors',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      render: (active) => (active ? 'Yes' : 'No'),
    },
    {
      title: 'Action',
      render: (_, record) => (
        <Flex gap={10}>
          <Button type='primary' onClick={() => router.push(`/cars/edit/${record._id}`)}>
            Edit
          </Button>
          <Popconfirm
            title='Delete the car'
            description='Are you sure to delete this task?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => deleteCar(record._id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <Flex gap='middle' vertical>
      <Button type='primary' style={{ marginLeft: 'auto' }} onClick={addCar}>
        Add Car
      </Button>
      <Table scroll={{ x: 'max-content' }} dataSource={carList} columns={columns} rowKey='_id' />
    </Flex>
  );
};

export default CarList;
