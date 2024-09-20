import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useContext } from 'react';
import { Resource } from 'types/resource';
import { useModal } from 'hooks';
import { Template } from 'types/template';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from 'contexts';
import { Override } from '../template/useEditPodTemplate';
import { ISshKey } from 'types/sshKey.types';
import { useRentExecutorMutation } from 'redux/apis/executorApi';
import { useLazyGetPodsQuery } from 'redux/apis/podsApi';

const podValidationSchema = yup.object().shape({
  pod_name: yup.string().required('Please enter Name'),
});

export interface PlanCard {
  id: number;
  title: string;
  sub_title?: string;
  price: number;
  total_price?: number;
  default_total_price?: number;
  description?: string;
  per_mont?: boolean;
  default_price: number;
  field: string;
}

const defaultPlan = (price: number, default_price: number) => ({
  id: 0,
  title: 'On-Demand',
  sub_title: 'Non-Interruptible',
  price: price,
  description: 'Pay as you go, with costs based on actual usage time.',
  default_price: default_price,
  field: 'secure_price',
});

const useDetails = (resource: Resource) => {
  const { closeModal, openModal } = useModal();
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [rentExecutor, { isLoading: isRenting }] = useRentExecutorMutation();
  const [getPods, { isLoading: isGettingPod }] = useLazyGetPodsQuery();

  const formik = useFormik({
    initialValues: {
      pod_name: '',
      max_gpu: 1,
    },
    onSubmit: (values) => handleSubmit(values),
    validationSchema: podValidationSchema,
  });
  const [selectedPlan, setSelectedPlan] = React.useState<PlanCard>(
    defaultPlan(resource.secure_price, resource.secure_price)
  );
  const [selectedTemplate, setSelectTemplate] = React.useState<Template | null>(null);
  const [overrides, setOverrides] = React.useState<Override | null>(null);
  const [new_template, setNewTemplate] = React.useState<Template | null>(null);
  const [selectedSshKey, setSelectedSshkey] = React.useState<ISshKey | null>(null);

  async function handleSubmit(values: { pod_name: string; max_gpu: number }) {
    const template = new_template ? new_template : selectedTemplate;

    if (!template) {
      return setToast({
        message: 'You need to choose Template!',
        type: 'warning',
        open: true,
      });
    }

    if (!selectedSshKey) {
      return setToast({
        message: 'You need to choose SSH Key!',
        type: 'warning',
        open: true,
      });
    }

    // const data = {
    //   pod_name: values.pod_name,
    //   price: 1,
    //   status: 'running',
    //   provider: 'AWS',
    //   category: 'High Performance',
    //   type: resource.type,
    //   resource: resource.id,
    //   gpu_count: values.max_gpu,
    //   template: template?.id,
    //   isinstance_pricing: {
    //     plan: selectedPlan.field,
    //   },
    //   template_config: {
    //     template,
    //     overrides: overrides,
    //   },
    // };

    try {
      const pod = await rentExecutor({
        id: resource.id,
        pod_name: values.pod_name,
        docker_image: template.container_image,
        user_public_key: selectedSshKey.public_key,
      }).unwrap();

      setToast({
        message: 'Created successfully',
        type: 'positive',
        open: true,
      });

      await getPods().unwrap();

      navigate(`/pods/details/${resource.id}`);
    } catch (error) {
      setToast({
        message: 'Can not rent this machine',
        type: 'warning',
        open: true,
      });
    }
  }

  const createPlanCards = (
    resource: Pick<Resource, 'one_month_price' | 'three_month_price' | 'six_month_price' | 'secure_price'>
  ): PlanCard[] => {
    const plans = [
      {
        title: '1 Month Savings Plan',
        price: resource.one_month_price,
        months: 1,
        per_mont: true,
        field: 'one_month_price',
      },
      {
        title: '3 Month Savings Plan',
        price: resource.three_month_price,
        months: 3,
        per_mont: true,
        field: 'three_month_price',
      },
      {
        title: '6 Month Savings Plan',
        price: resource.six_month_price,
        months: 6,
        per_mont: true,
        field: 'six_month_price',
      },
    ];

    const plan_list: PlanCard[] = [defaultPlan(resource.secure_price * formik.values.max_gpu, resource.secure_price)];

    plans.forEach((plan, index) => {
      if (plan.price) {
        plan_list.push({
          id: index + 1,
          title: plan.title,
          price: plan.price * formik.values.max_gpu,
          default_price: plan.price,
          total_price: plan.months * 30 * 24 * plan.price * formik.values.max_gpu,
          default_total_price: plan.months * 30 * 24 * plan.price,
          description: `Reserve a GPU for ${plan.months} month${
            plan.months > 1 ? 's' : ''
          } at a discounted hourly cost.`,
          per_mont: plan.per_mont,
          field: plan.field,
        });
      }
    });

    return plan_list;
  };

  const handleSelectPlan = (plan: PlanCard) => {
    setSelectedPlan(plan);
  };

  const handleSelectTemplate = (template: Template) => {
    setSelectTemplate(template);
    closeModal('change-pod-template-modal');
  };

  const handleOpenChangeTemplateModal = () => {
    openModal({ name: 'change-pod-template-modal', data: { handleSelectTemplate } });
  };

  const handleClearOverrides = () => {
    setNewTemplate(null);
    setOverrides(null);
    closeModal('edit-pod-template-modal');
  };

  const handleOpenEditTemplateModal = () => {
    openModal({
      name: 'edit-pod-template-modal',
      data: {
        template: selectedTemplate,
        handleEditTemplate,
        new_template,
        handleClearOverrides,
      },
    });
  };

  const handleEditTemplate = (template: Template, overrides: Override) => {
    setNewTemplate(template);
    setOverrides(overrides);
    closeModal('edit-pod-template-modal');
  };

  const onChangeSshKey = (key: ISshKey) => {
    setSelectedSshkey(key);
    closeModal('change-ssh-key-modal');
  };

  const handleOpenChangeSshKeyModal = () => {
    openModal({ name: 'change-ssh-key-modal', data: { onChangeSshKey } });
  };

  return {
    formik,
    plan_cards: createPlanCards(resource),
    handleSelectPlan,
    selectedPlan,
    handleOpenChangeTemplateModal,
    selectedTemplate,
    create_pod_loading: isRenting || isGettingPod,
    handleOpenEditTemplateModal,
    handleEditTemplate,
    overrides,
    selectedSshKey,
    handleOpenChangeSshKeyModal,
  };
};

export default useDetails;
