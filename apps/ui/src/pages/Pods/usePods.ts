import React, { useMemo } from 'react';
import { Resource } from 'types/resource';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { useGetAvailableExecutorsQuery } from 'redux/apis/executorApi';
import { useGetPodsQuery } from 'redux/apis/podsApi';

const groupByType = (data: any) => {
  return data.reduce((acc: any, item: any) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
};

// TODO: need to be removed
const DEFAULT_POD: any = {
  template_container_image: 'runpod/pytorch:2.1.0-py3.10-cuda11.8.0-devel-ubuntu22.04',
  pod_name: 'Demo Pod',
  resource_display_name: 'RTX 4090',
  resource_ram: '90G',
  status: 'running',
  id: 1,
};

const resources = [
  {
    id: '1',
    name: 'machine 1',
    display_name: 'RTX 4090',
    type: 'gpu',
    category: 'NVIDIA',
    ram: 4096,
    secure_price: 10,
    one_month_price: 10,
    three_month_price: 30,
    six_month_price: 55,
    max_gpu: 8,
    lowest_price: {},
    status: 'high',
    disc_type: 'ssd',
    cloud_type: 'secure cloud',
    region: 'CA-MTL-1',
    cuda_version: 101,
  },
  {
    id: '2',
    name: 'machine 2',
    display_name: 'H100 SXM',
    type: 'gpu',
    category: 'NVIDIA',
    ram: 4096,
    secure_price: 10,
    one_month_price: 10,
    three_month_price: 30,
    six_month_price: 55,
    max_gpu: 8,
    lowest_price: {},
    status: 'high',
    disc_type: 'ssd',
    cloud_type: 'secure cloud',
    region: 'CA-MTL-1',
    cuda_version: 101,
  },
  {
    id: '3',
    name: 'machine 3',
    display_name: 'H100 PCIe',
    type: 'gpu',
    category: 'NVIDIA',
    ram: 4096,
    secure_price: 10,
    one_month_price: 10,
    three_month_price: 30,
    six_month_price: 55,
    max_gpu: 8,
    lowest_price: {},
    status: 'high',
    disc_type: 'ssd',
    cloud_type: 'secure cloud',
    region: 'CA-MTL-1',
    cuda_version: 101,
  },
];

export const usePod = () => {
  const location = useLocation();
  const prevLocation = React.useRef(location);

  const { data: pods = [], isLoading } = useGetPodsQuery();

  const fixedPods = pods.map((pod) => ({...DEFAULT_POD, ...pod}));

  return {
    pods: fixedPods,
    pods_loading: isLoading,
  };
};

export const useResource = () => {
  const { data: executors = [], isLoading } = useGetAvailableExecutorsQuery();

  const resources = useMemo(
    () =>
      executors.map((executor) => ({
        ...executor,
        name: executor.specs.gpu.details[0].name,
        display_name: executor.specs.gpu.details[0]?.name || executor.specs.cpu.model,
        type: 'gpu',
        category: 'NVIDIA',
        ram: executor.specs.ram.free,
        secure_price: 10,
        one_month_price: 10,
        three_month_price: 30,
        six_month_price: 55,
        max_gpu: executor.specs.gpu.count,
        status: 'high',
        disc_type: 'ssd',
        cloud_type: 'secure cloud',
        region: 'CA-MTL-1',
        cuda_version: executor.specs.gpu.details[0]?.cuda,
      })),
    [executors]
  );

  const formik = useFormik({
    initialValues: {
      cloud_type: 'Secure Cloud',
      region: 'Any',
      vcpu: 1,
      ram: '100',
      disc_type: 'ssd',
      cuda_version: 'Any',
      vram: 0,
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => { },
  });

  React.useEffect(() => {
    const { values } = formik;
    const filters = {
      cloud_type: values.cloud_type.toLowerCase(),
      ...(values.region !== 'Any' && { region: values.region }),
      ...(values.cuda_version !== 'Any' && { cuda_version: values.cuda_version }),
      ram: values.ram,
      disc_type: values.disc_type.toLowerCase(),
    };
    // refetch({
    //     filters
    // })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values]);

  return {
    resources: groupByType(resources),
    formik,
    isLoading,
  };
};

export const usePodContent = () => {
  const [resource, setResource] = React.useState<null | Resource>(null);
  const handleSelectResource = (resource: Resource) => {
    setResource(resource);
  };

  return {
    handleSelectResource,
    resource,
  };
};
