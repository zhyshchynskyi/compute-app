import { useFormik } from 'formik';
import * as yup from 'yup';
import { SSH, SSHInput } from 'types/ssh';
import { useModal } from 'hooks';
import { useContext } from 'react';
import { ToastContext } from 'contexts';

const validationSchema = yup.object().shape({
  name: yup.string().required('Please enter SSH Name'),
  key: yup.string().required('Please enter SSH Key'),
});

const useUpdateSSH = (ssh: Pick<SSH, 'name' | 'key' | 'id'>) => {
  const { closeModal } = useModal();
  const { setToast } = useContext(ToastContext);

  const formik = useFormik({
    initialValues: {
      name: ssh.name,
      key: ssh.key,
    },
    enableReinitialize: true,
    onSubmit: (values) => handleSubmit(values),
    validationSchema,
  });

  async function handleSubmit(values: SSHInput) {
    // const result = await updateSsh(ssh.id, values)
    // if (result) {
    //   setToast({
    //     message: result.message,
    //     type: result.success ? 'positive' : 'warning',
    //     open: true,
    //   })
    //   if (result.success) {
    //     closeModal('update-shh-key-modal')
    //   }
    // }
  }

  return {
    formik,
    update_shh_loader: false,
  };
};

export default useUpdateSSH;
