import Box from '@mui/material/Box';

import FormikTextField from 'components/TextFieldFormik';
import TextareaFormik from 'components/TextareaFormik';
import { FormikProvider } from 'formik';

import AgentDropdown from 'pages/Agents/AgentForm/components/AgentDropdown';

import { StyledFormInputWrapper } from 'styles/formStyles.css';
import { StyledPanelWrapper } from 'styles/panelStyles.css';

import { Credential } from 'types/credential';

const Settings = ({ formik }: { formik: any }) => {
  // const { data: credentials } = useGetCredentials()
  const credentials: any[] = [];

  const credentialsList = credentials.map((item: Credential) => ({
    label: item.credential_name,
    value: item.id,
  }));

  return (
    <FormikProvider value={formik}>
      <StyledPanelWrapper>
        <StyledFormInputWrapper noPadding style={{ paddingLeft: '5px' }}>
          <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={3}>
            <FormikTextField
              name="template_config.template_data.container_image"
              placeholder={'Container Image'}
              label={'Container Image'}
            />
            <AgentDropdown
              label={'Container Registry Credentials'}
              fieldName={'template_config.template_data.credential'}
              setFieldValue={formik?.setFieldValue}
              fieldValue={formik.values.template_config?.template_data?.credential}
              options={credentialsList}
              optionSize={'small'}
              size={'small'}
              labelGap={4}
            />
          </Box>

          <Box>
            <TextareaFormik
              setFieldValue={(field: string, value: string) => formik.setFieldValue(field, value)}
              label={'Container Start Command'}
              value={formik.values.template_config?.template_data?.container_start_command}
              fieldName={'template_config.template_data.container_start_command'}
            />
          </Box>
          <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={3}>
            <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={3}>
              <FormikTextField
                name="template_config.template_data.container_disk"
                placeholder={'Container Disc'}
                label={'Container Disc'}
              />
              {formik.values.template_config?.template_data?.compute_type !== 'cpu' && (
                <FormikTextField
                  name="template_config.template_data.volume_disk"
                  placeholder={'Volume Disc'}
                  label={'Volume Disc'}
                />
              )}
            </Box>
            {formik.values.template_config?.template_data?.compute_type !== 'cpu' && (
              <FormikTextField
                name="template_config.template_data.volume_mount_path"
                placeholder={'Volume Mount Path'}
                label={'Volume Mount Path'}
              />
            )}
          </Box>
          <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={3}>
            <FormikTextField
              name="template_config.template_data.expose_http_ports"
              placeholder={'Expose HTTP Ports (Max 10)'}
              label={'Expose HTTP Ports (Max 10)'}
            />
            <FormikTextField
              name="template_config.template_data.expose_tcp_ports"
              placeholder={'Expose TCP Ports'}
              label={'Expose TCP Ports'}
            />
          </Box>
        </StyledFormInputWrapper>
      </StyledPanelWrapper>
    </FormikProvider>
  );
};

export default Settings;
