import { FormikProvider } from 'formik'
import withRenderModal from 'hocs/withRenderModal'
import MainModal from 'modals/MainModal'
import styled from 'styled-components'
import RateLimitForm from '../components/RateLimitForm'
import useCreateRateLimit from './useCreateRateLimit'

const CreateRateLimit = () => {
  const { formik, handleCloseModal, create_rate_limit_loading, subnets, subnet_api_services } =
    useCreateRateLimit()
  return (
    <FormikProvider value={formik}>
      <MainModal
        onClose={handleCloseModal}
        title={'Add Rate Limit'}
        submitLoading={create_rate_limit_loading}
        onSubmit={formik.handleSubmit}
      >
        <StyledBody>
          <RateLimitForm
            formik={formik}
            subnets={subnets}
            subnet_api_services={subnet_api_services}
          />
        </StyledBody>
      </MainModal>
    </FormikProvider>
  )
}

export default withRenderModal('create-rate-limit-modal')(CreateRateLimit)

export const StyledBody = styled.div`
  padding-bottom: 20px;

  width: 90vw;
  max-width: 700px;
  min-width: 400px;

  height: auto;
`
