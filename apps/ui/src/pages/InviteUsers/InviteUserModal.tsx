import { FormikProvider } from 'formik'
import styled from 'styled-components'
import withRenderModal from 'hocs/withRenderModal'

import MainModal from 'modals/MainModal'

import useInviteUsers from './useInviteUsers'

import FormikTextField from 'components/TextFieldFormik'

import { t } from 'i18next'

const InviteUserModal = () => {
    const { formik, create_access_loading, handleCloseModal } = useInviteUsers()

    return (
        <FormikProvider value={formik}>
            <MainModal
                onClose={handleCloseModal}
                onSubmit={formik.handleSubmit}
                submitLabel='Invite'
                title={'Invite user'}
                submitLoading={create_access_loading}
            >
                <StyledFormWrapper>
                    <FormikTextField name='email' placeholder={t('email')} label={t('email')} />
                </StyledFormWrapper>
            </MainModal>
        </FormikProvider>
    )
}

export default withRenderModal('invite-user-modal')(InviteUserModal)

const StyledFormWrapper = styled.div`
    padding: 20px;
    width: 500px;

    height: 150px;
`
