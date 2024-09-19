import withRenderModal from 'hocs/withRenderModal';

import MainModal from 'modals/MainModal';

import { useModal } from 'hooks';

import { FormikProvider } from 'formik';
import FormikTextField from 'components/TextFieldFormik';
import useUpdateSSH from './useUpdateSSH';
import { StyledBody } from '../AddKeyModal';
import { ISshKey } from 'types/sshKey.types';

const UpdateSSHModal = ({ data: { ssh } }: { data: { ssh: ISshKey } }) => {
  const { formik, update_shh_loader } = useUpdateSSH(ssh);
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal('update-shh-key-modal');
  };

  return (
    <FormikProvider value={formik}>
      <MainModal
        onClose={handleCloseModal}
        title={'Update SHH key'}
        submitLoading={update_shh_loader}
        onSubmit={formik.handleSubmit}
      >
        <StyledBody>
          <FormikTextField name="name" placeholder={'SSH Name'} label={'SSH Name'} />
          <FormikTextField name="public_key" placeholder={'SSH Key'} label={'SSH Key'} />
        </StyledBody>
      </MainModal>
    </FormikProvider>
  );
};

export default withRenderModal('update-shh-key-modal')(UpdateSSHModal);
