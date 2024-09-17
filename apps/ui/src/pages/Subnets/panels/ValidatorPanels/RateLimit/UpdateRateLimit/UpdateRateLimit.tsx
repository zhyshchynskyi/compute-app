import { FormikProvider } from 'formik'
import withRenderModal from 'hocs/withRenderModal'
import MainModal from 'modals/MainModal'
import styled from 'styled-components'
import RateLimitForm from '../components/RateLimitForm'
import useUpdateRateLimit from './useUpdateRateLimit'
import { RateLimit } from 'types/rateLimit'
import { StyledBody } from '../CreateRateLimit/CreateRateLimit'

const UpdateRateLimit = ({ data: { rate_limit } }: { data: { rate_limit: RateLimit } }) => {
  const { formik, handleCloseModal, update_rate_limit_loading, subnets, subnet_api_services } =
    useUpdateRateLimit(rate_limit)

  return (
    <FormikProvider value={formik}>
      <MainModal
        onClose={handleCloseModal}
        title={'Update Rate Limit'}
        submitLoading={update_rate_limit_loading}
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

export default withRenderModal('update-rate-limit-modal')(UpdateRateLimit)
