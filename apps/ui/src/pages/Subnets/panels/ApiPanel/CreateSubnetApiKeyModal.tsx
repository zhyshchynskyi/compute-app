import styled from 'styled-components'
import withRenderModal from 'hocs/withRenderModal'

import MainModal from 'modals/MainModal'

import { useModal } from 'hooks'

import { FormikProvider } from 'formik'

import ApiKeysForm from 'pages/ApiKeys/CreateApiKey/ApiKeysForm'
import { useCreateApiKey } from 'pages/ApiKeys/CreateApiKey/useCreateApiKey'
import { useParams } from 'react-router-dom'

const CreateSubnetApiKeyModal = () => {
    const { formik, isLoading } = useCreateApiKey({
        isSubnet: true,
        callback: () => handleCloseModal(),
    })
    const { closeModal } = useModal()

    const handleCloseModal = () => {
        closeModal('create-subnet-api-key-modal')
    }

    const { id } = useParams()

    return (
        <FormikProvider value={formik}>
            <MainModal
                onClose={handleCloseModal}
                title={'Create API key'}
                submitLoading={isLoading}
                onSubmit={formik.handleSubmit}
            >
                <StyledBody>
                    <ApiKeysForm formik={formik} subnetId={id} />
                </StyledBody>
            </MainModal>
        </FormikProvider>
    )
}

export default withRenderModal('create-subnet-api-key-modal')(CreateSubnetApiKeyModal)

export const StyledBody = styled.div`
    width: 90vw;
    max-width: 700px;
    min-width: 400px;

    /* height: 500px; */

    padding: 0 20px;
`
