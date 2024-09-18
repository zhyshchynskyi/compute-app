import styled from 'styled-components';
import withRenderModal from 'hocs/withRenderModal';

import MainModal from 'modals/MainModal';

import { useModal } from 'hooks';

import { FormikProvider, useFormik } from 'formik';
import FormikTextField from 'components/TextFieldFormik';
import { ToastContext } from 'contexts';
import { useContext } from 'react';
import * as yup from 'yup';

type EditPodNameModalProps = {
  data: {
    name: string;
    id: string;
  };
};

const podNameValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

const EditPodNameModal = ({ data }: EditPodNameModalProps) => {
  const { setToast } = useContext(ToastContext);

  const { name, id } = data;

  const initialValues = {
    name: name || '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: podNameValidationSchema,
    onSubmit: async (values) => handleSubmit(values),
  });

  const handleSubmit = async (values: { name: string }) => {
    try {
      // await updatePodName(id, { pod_name: values.name })
      // handleCloseModal()
      // setToast({
      //   message: 'Name was changed!',
      //   type: 'positive',
      //   open: true,
      // })
    } catch (error) {
      setToast({
        message: 'Failed to change name!',
        type: 'negative',
        open: true,
      });
    }
  };

  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal('edit-pod-name-modal');
  };

  return (
    <FormikProvider value={formik}>
      <MainModal
        onClose={handleCloseModal}
        title={'Change Pod name'}
        submitLoading={false}
        onSubmit={formik.handleSubmit}
      >
        <StyledBody>
          <FormikTextField name="name" placeholder={'name'} label={'Name'} />
        </StyledBody>
      </MainModal>
    </FormikProvider>
  );
};

export default withRenderModal('edit-pod-name-modal')(EditPodNameModal);

const StyledBody = styled.div`
  padding: 20px;
  padding-top: 0;

  width: 90vw;
  max-width: 700px;
  min-width: 400px;

  height: auto;
`;
