import { StyledFormInputWrapper } from 'styles/formStyles.css'
import { StyledPanelWrapper } from 'styles/panelStyles.css'
import { FormikProvider } from 'formik'
import FormikTextField from 'components/TextFieldFormik/TextFieldFormik'
import TextareaFormik from 'components/TextareaFormik'
import UploadImage from 'components/UploadImage'
import { useGenerateUploadUrlService, useUploadFileService } from 'services/useFileService'
import { useState } from 'react'

const default_logo = 'https://img.cryptorank.io/coins/bittensor1670850707129.png'

const SettingsPanel = ({ formik }: any) => {
  const { generateUploadUrlService } = useGenerateUploadUrlService()
  const { uploadFileService } = useUploadFileService()

  const [uploadFileLoader, setUploadFileLoader] = useState(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadFileLoader(true)
    try {
      const { files } = event.target
      if (!files) return

      const data = {
        name: files[0].name,
        type: files[0].type,
        size: files[0].size,
      }
      const res = await generateUploadUrlService(data)

      await uploadFileService(res.signed_url, files[0])

      formik.setFieldValue('logo', res.file_url)
    } catch (e) {
      console.log(e)
    }
    setUploadFileLoader(false)
  }

  const handleRemoveLogo = () => {
    formik.setFieldValue('logo', default_logo)
  }

  return (
    <>
      <FormikProvider value={formik}>
        <StyledPanelWrapper>
          <StyledFormInputWrapper noPadding style={{ paddingLeft: '5px' }}>
            <FormikTextField label='Name' name='name' placeholder='name' />
            <TextareaFormik
              label={'Description'}
              value={formik.values.description}
              fieldName={'description'}
              placeholder='description'
            />

            <UploadImage
              buttonLabel='Upload Logo'
              loading={uploadFileLoader}
              value={formik.values.logo}
              onChange={handleFileChange}
              remove={handleRemoveLogo}
              hideRemove={!uploadFileLoader && formik.values.logo !== default_logo}
            />
          </StyledFormInputWrapper>
        </StyledPanelWrapper>
      </FormikProvider>
    </>
  )
}

export default SettingsPanel
