'use client';
import React, { useEffect, useState } from 'react';
import { Flex, Cascader, message } from 'antd';
import axios from 'axios';
import AddCarForm from '@/components/addCarForm/AddCarForm';
import { useRouter } from 'next/navigation';
import { setLoading } from '@/redux/loadingSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const AddCar = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [initialValues, setInitialValues] = useState({});

  const getCarMakes = async () => {
    try {
      const response = await axios.post('/api/cars', {
        url: 'makes',
        params: {
          direction: 'asc',
          sort: 'name',
        },
      });
      console.log(response.data.data.data);
      setOptions(
        response.data.data.data.map((make) => {
          return {
            value: make.id,
            label: make.name,
            isLeaf: false,
          };
        })
      );
    } catch (error) {
      message.error(t(error.response?.data?.message || error.message));
    }
  };

  const getCarModels = async (targetOption) => {
    try {
      const response = await axios.post('/api/cars', {
        url: 'models',
        params: {
          direction: 'asc',
          sort: 'name',
          make_id: targetOption.value,
          verbose: 'yes',
        },
      });
      console.log(response.data.data.data);
      targetOption.children = response.data.data.data.map((model) => {
        return {
          value: model.id,
          label: model.name,
          isLeaf: false,
        };
      });
      setOptions([...options]);
    } catch (error) {
      message.error(t(error.response?.data?.message || error.message));
    }
  };

  const getCarYears = async (targetOption) => {
    try {
      const response = await axios.post('/api/cars', {
        url: 'years',
        params: {
          make_model_id: targetOption.value,
        },
      });
      targetOption.children = response.data.data.map((year) => {
        return {
          value: year,
          label: year,
          isLeaf: false,
        };
      });
      setOptions([...options]);
    } catch (error) {
      message.error(t(error.response?.data?.message || error.message));
    }
  };

  const getCarTrims = async (targetOption, make_model_id) => {
    try {
      const response = await axios.post('/api/cars', {
        url: 'trims',
        params: {
          direction: 'asc',
          sort: 'name',
          year: targetOption.value,
          make_model_id: make_model_id,
          verbose: 'yes',
        },
      });
      console.log(response.data.data.data);
      targetOption.children = response.data.data.data.map((model) => {
        return {
          value: model.id,
          label: model.name,
          isLeaf: true,
        };
      });
      setOptions([...options]);
    } catch (error) {
      message.error(t(error.response?.data?.message || error.message));
    }
  };

  const getCarDetailsByTrimId = async (trimid) => {
    try {
      const response = await axios.post('/api/cars', {
        url: `trims/${trimid}`,
      });
      console.log(response.data.data);
      const carInfo = response.data.data;
      setInitialValues({
        make: carInfo.make_model.make.name,
        model: carInfo.make_model.name,
        year: carInfo.year,
        fuel: carInfo.make_model_trim_engine.fuel_type,
        seats: carInfo.make_model_trim_body.seats,
        doors: carInfo.make_model_trim_body.doors,
        active: true,
      });
    } catch (error) {
      message.error(t(error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    getCarMakes();
  }, []);

  const loadData = (selectedOptions) => {
    console.log('🚀 ~ loadData ~ selectedOptions:', selectedOptions);
    const targetOption = selectedOptions[selectedOptions.length - 1];
    console.log('🚀 ~ loadData ~ targetOption:', targetOption);
    if (selectedOptions.length === 1) {
      getCarModels(targetOption);
    } else if (selectedOptions.length === 2) {
      getCarYears(targetOption);
    } else if (selectedOptions.length === 3) {
      getCarTrims(targetOption, selectedOptions[1].value);
    }
  };

  const onChange = (value, selectedOptions) => {
    console.log('🚀 ~ onChange ~ value, selectedOptions:', value, selectedOptions);
    setInitialValues({});
    if (value.length == 4) {
      const [makeid, modelid, year, trimid] = value;
      getCarDetailsByTrimId(trimid);
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post('/api/car', values);
      message.success(t(response.data.message));
      router.push('/cars');
      console.log(response.data.data);
    } catch (error) {
      message.error(t(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Flex gap='middle' vertical>
      <Cascader options={options} loadData={loadData} onChange={onChange} changeOnSelect />
      {Object.keys(initialValues).length > 0 && (
        <AddCarForm initialValues={initialValues} onFinish={onFinish} />
      )}
    </Flex>
  );
};

export default AddCar;
