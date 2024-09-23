import React, { useRef } from 'react'
import { StyledFormInputWrapper } from 'styles/formStyles.css'

import Box from '@mui/material/Box'
import FormikTextField from 'components/TextFieldFormik'
import TextareaFormik from 'components/TextareaFormik'

// eslint-disable-next-line import/no-extraneous-dependencies
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import EnvVariables from './EnvVariables'

import RadioButton from 'share-ui/components/RadioButton/RadioButton'
import styled from 'styled-components'
import TypographyPrimary from 'components/Typography/Primary'
import Dropdown from 'components/Dropdown'

interface TemplateFormProps {
  formik: any
  label: string
  credentials: {
    label: string
    value: string
  }[]
}

const TemplateForm = ({ formik, label, credentials }: TemplateFormProps) => {
  const [env_is_open, setEnvIsOpen] = React.useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToEnv = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({
        behavior: 'smooth',
      })
    }, 1)
  }

  return (
    <StyledFormInputWrapper>
      <div />
      <Box display={'grid'} gridTemplateColumns={'1fr .3fr .3fr'} gap={3} alignItems={'start'}>
        <FormikTextField name='name' placeholder={'Template name'} label={'Name'} />
        <Dropdown
          label={'Template Type'}
          fieldName={'template_type'}
          setFieldValue={formik?.setFieldValue}
          fieldValue={formik.values.template_type}
          options={[
            { label: 'Pod', value: 'pod' },
            { label: 'Serverless', value: 'serverless' },
          ]}
          optionSize={'small'}
          size={'small'}
          labelGap={4}
        />
        <Dropdown
          label={'Compute Type'}
          fieldName={'compute_type'}
          setFieldValue={formik?.setFieldValue}
          fieldValue={formik.values.compute_type}
          options={[
            { label: 'Nvidia GPU', value: 'nvidia gpu' },
            { label: 'Amd GPU', value: 'amd gpu' },
            { label: 'CPU', value: 'cpu' },
          ]}
          optionSize={'small'}
          size={'small'}
          labelGap={4}
        />
      </Box>

      <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={3}>
        <FormikTextField name='container_image' placeholder={'Container Image'} label={'Container Image'} />
        <Dropdown
          label={'Container Registry Credentials'}
          fieldName={'credential'}
          setFieldValue={formik?.setFieldValue}
          fieldValue={formik.values.credential}
          options={credentials}
          optionSize={'small'}
          size={'small'}
          labelGap={4}
        />
      </Box>

      <Box>
        <TextareaFormik
          setFieldValue={(field: string, value: string) => formik.setFieldValue(field, value)}
          label={'Container Start Command'}
          value={formik.values.container_start_command}
          fieldName={'container_start_command'}
        />
      </Box>
      <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={3}>
        <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={3}>
          <FormikTextField name='container_disk' placeholder={'Container Disc'} label={'Container Disc'} />
          {formik.values.compute_type !== 'cpu' && (
            <FormikTextField name='volume_disk' placeholder={'Volume Disc'} label={'Volume Disc'} />
          )}
        </Box>
        {formik.values.compute_type !== 'cpu' && (
          <FormikTextField name='volume_mount_path' placeholder={'Volume Mount Path'} label={'Volume Mount Path'} />
        )}
      </Box>
      <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={3}>
        <FormikTextField
          name='expose_http_ports'
          placeholder={'Expose HTTP Ports (Max 10)'}
          label={'Expose HTTP Ports (Max 10)'}
        />
        <FormikTextField name='expose_tcp_ports' placeholder={'Expose TCP Ports'} label={'Expose TCP Ports'} />
      </Box>
      <Box display={'flex'} flexDirection={'column'} gap={1}>
        <TypographyPrimary value='Template Visibility' size='medium ' semiBold />

        <Box display={'flex'} flexDirection={'row'} gap={1}>
          <RadioButton
            text={'Public'}
            name='template_visibility'
            onSelect={() => formik.setFieldValue('template_visibility', 'public')}
            checked={formik.values.template_visibility?.includes('public')}
          />
          <RadioButton
            text={'Private'}
            name='template_visibility'
            onSelect={() => formik.setFieldValue('template_visibility', 'private')}
            checked={formik.values.template_visibility?.includes('private')}
          />
        </Box>
      </Box>

      <Box>
        <Box
          display={'flex'}
          alignItems={'center'}
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setEnvIsOpen(!env_is_open)
            scrollToEnv()
          }}
          gap={0.5}
        >
          <TypographyPrimary value='Environment Variables' size='small' semiBold />

          <StyledKeyboardArrowDownIcon fontSize='small' isOpen={env_is_open} />
        </Box>
        {env_is_open && (
          <>
            <div ref={scrollRef} />
            <Box>
              <EnvVariables formik={formik} />
            </Box>
          </>
        )}
      </Box>
    </StyledFormInputWrapper>
  )
}

export default TemplateForm

const StyledKeyboardArrowDownIcon = styled(KeyboardArrowDownIcon)<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease-in-out;

  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
