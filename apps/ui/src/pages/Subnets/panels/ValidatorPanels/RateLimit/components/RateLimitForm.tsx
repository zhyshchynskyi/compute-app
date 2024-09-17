import { StyledFormInputWrapper } from 'styles/formStyles.css'
import Box from '@mui/material/Box'
import FormikTextField from 'components/TextFieldFormik'
import AgentDropdown from 'pages/Agents/AgentForm/components/AgentDropdown'
import { RateLimitAccountLevelEnum } from 'types/rateLimit'

const account_level = [
  {
    label: RateLimitAccountLevelEnum.Starter,
    value: RateLimitAccountLevelEnum.Starter,
  },
  {
    label: RateLimitAccountLevelEnum.Pro,
    value: RateLimitAccountLevelEnum.Pro,
  },
  {
    label: RateLimitAccountLevelEnum.Enterprise,
    value: RateLimitAccountLevelEnum.Enterprise,
  },
]

const RateLimitForm = ({ formik, subnets, subnet_api_services }: any) => {
  return (
    <StyledFormInputWrapper>
      <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={3} alignItems={'start'}>
        <Box>
          <FormikTextField name='per_hour' placeholder={'Per hour'} label={'Per hour'} />
        </Box>
        <Box>
          <FormikTextField name='per_day' placeholder={'Per day'} label={'Per day'} />
        </Box>
      </Box>

      <Box
        display={'grid'}
        // gridTemplateColumns={'1fr 1fr'} gap={3} alignItems={'start'}
      >
        <Box>
          <FormikTextField name='per_month' placeholder={'Per month'} label={'Per month'} />
        </Box>
        {/* <Box>
          <FormikTextField
            name='monthly_usage_limit'
            placeholder={'Monthly usage limit'}
            label={'Monthly usage limit'}
          />
        </Box> */}
      </Box>

      <Box>
        <AgentDropdown
          label={'Account level'}
          fieldName={'account_level'}
          setFieldValue={formik?.setFieldValue}
          fieldValue={formik.values.account_level}
          options={account_level}
          optionSize={'small'}
          size={'small'}
          labelGap={4}
        />
      </Box>
      <Box>
        <AgentDropdown
          label={'Subnet'}
          fieldName={'subnet_id'}
          setFieldValue={formik?.setFieldValue}
          fieldValue={formik.values.subnet_id}
          options={subnets}
          optionSize={'small'}
          size={'small'}
          labelGap={4}
          disabled
        />
      </Box>
      <Box>
        <AgentDropdown
          label={'Subnet API services'}
          fieldName={'subnet_api_service_id'}
          setFieldValue={formik?.setFieldValue}
          fieldValue={formik.values.subnet_api_service_id}
          options={subnet_api_services}
          optionSize={'small'}
          size={'small'}
          labelGap={4}
        />
      </Box>
    </StyledFormInputWrapper>
  )
}

export default RateLimitForm
