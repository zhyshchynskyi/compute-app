import { useFormik } from 'formik';
import * as yup from 'yup';
import { useModal } from 'hooks';
import { useContext } from 'react';
import { ToastContext } from 'contexts';
import { ISshKey } from 'types/sshKey.types';
import { ISshKeyRegisterRequest, useUpdateSshKeyMutation } from 'redux/apis/sshKeyApi';

const validationSchema = yup.object().shape({
  name: yup.string().required('Please enter SSH Name'),
  public_key: yup.string().required('Please enter SSH Key'),
});

const useUpdateSSH = (ssh: Pick<ISshKey, 'name' | 'public_key' | 'id'>) => {
  const { closeModal } = useModal();
  const { setToast } = useContext(ToastContext);

  const [updateSshKey, { isLoading }] = useUpdateSshKeyMutation();

  const formik = useFormik({
    initialValues: {
      name: ssh.name,
      public_key: ssh.public_key,
    },
    enableReinitialize: true,
    onSubmit: (values) => handleSubmit(values),
    validationSchema,
  });

  async function handleSubmit(values: ISshKeyRegisterRequest) {
    try {
      await updateSshKey({
        ...values,
        id: ssh.id,
      }).unwrap();

      closeModal('update-shh-key-modal');

      setToast({
        message: 'Ssh key updated',
        type: 'positive',
        open: true,
      });
    } catch (error) {
      setToast({
        message: 'Udpate failed',
        type: 'warning',
        open: true,
      });
    }
  }

  return {
    formik,
    update_shh_loader: isLoading,
  };
};

export default useUpdateSSH;
