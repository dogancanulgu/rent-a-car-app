'use client';
import React, { useEffect, useState } from 'react';
import { setLoading } from '@/redux/loadingSlice';
import { useDispatch } from 'react-redux';
import { Flex, message } from 'antd';
import axios from 'axios';
import AddCarForm from '@/components/addCarForm/AddCarForm';
import { useRouter } from 'next/navigation';

const Car = ({ params }) => {
  console.log(params.carId);
  const router = useRouter();
  const dispatch = useDispatch();
  const [carDetails, setCarDetails] = useState({});

  useEffect(() => {
    getCarDetails();
  }, []);

  const onFinish = async (values) => {
    try {
      dispatch(setLoading(true));
      console.log(values)
      const response = await axios.put(`/api/car/${params.carId}`, values);
      message.success(response.data.message);
      router.push('/cars');
    } catch (error) {
      message.error(error.response?.data?.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getCarDetails = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`/api/car/${params.carId}`);
      console.log('🚀 ~ getCarDetails ~ response:', response.data.data);
      setCarDetails(response.data.data);
    } catch (error) {
      message.error(error.response?.data?.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <Flex gap='middle' vertical>
      {carDetails && Object.keys(carDetails)?.length > 0 ? (
        <AddCarForm isEdit initialValues={carDetails} onFinish={onFinish} />
      ) : null}
    </Flex>
  );
};

export default Car;
