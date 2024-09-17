import { StyledFormInputWrapper } from 'styles/formStyles.css'
import Box from '@mui/material/Box'
import FormikTextField from 'components/TextFieldFormik'
import TextareaFormik from 'components/TextareaFormik'
import RadioButton from 'share-ui/components/RadioButton/RadioButton'
import { SubnetApiVisibilityEnum } from 'types/subnetApiService'
// import UploadedFile from 'components/UploadedFile'

import TextEditor from 'components/TextEditor'

import { useForm } from './useForm'
import UploadImage from 'components/UploadImage'
import { useAppModeContext } from 'context/AppModeContext'
import Tooltip from 'share-ui/components/Tooltip/Tooltip'

interface SubnetApiServiceFormProps {
    formik: any
}
const SubnetApiServiceForm = ({ formik }: SubnetApiServiceFormProps) => {
    const { uploadFileLoader, handleRemoveIcon, handleFileChange, default_icon } = useForm({
        formik,
    })

    const { selected_account } = useAppModeContext()

    return (
        <StyledFormInputWrapper>
            <div />

            <Box width={'100%'}>
                <FormikTextField
                    name='name'
                    placeholder={'Subnet Api Service Name'}
                    label={'Subnet Api Service Name'}
                />
            </Box>
            <Box width={'100%'}>
                <TextareaFormik
                    setFieldValue={(field: string, value: string) =>
                        formik.setFieldValue(field, value)
                    }
                    label={'Subnet Api Service Description'}
                    value={formik.values.description}
                    fieldName={'description'}
                />
            </Box>
            <Box width={'100%'}>
                <TextEditor
                    value={formik.values.full_description}
                    onChange={value => formik.setFieldValue('full_description', value)}
                    placeholder={'Subnet Api Service full Description'}
                    label={'Subnet Api Service full Description'}
                />
            </Box>
            <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={3}>
                <FormikTextField
                    name='price_per_request'
                    placeholder={'Subnet Api Service Price Per Request'}
                    label={'Subnet Api Service Price Per Request $'}
                    type='number'
                />
                <FormikTextField
                    name='doc_link'
                    placeholder={'Subnet Api Service Dock Link'}
                    label={'Subnet Api Service Dock Link'}
                />
            </Box>
            <Box display={'flex'} flexDirection={'row'} gap={1}>
                <Tooltip
                    content={
                        !selected_account?.active
                            ? 'Your account does not have permission to perform this action.'
                            : ''
                    }
                >
                    <RadioButton
                        text={'Public'}
                        name='visibility'
                        onSelect={() =>
                            formik.setFieldValue('visibility', SubnetApiVisibilityEnum.PUBLIC)
                        }
                        checked={formik.values.visibility.includes(SubnetApiVisibilityEnum.PUBLIC)}
                        disabled={!selected_account?.active}
                    />
                </Tooltip>
                <RadioButton
                    text={'Private'}
                    name='visibility'
                    onSelect={() =>
                        formik.setFieldValue('visibility', SubnetApiVisibilityEnum.PRIVATE)
                    }
                    checked={formik.values.visibility.includes(SubnetApiVisibilityEnum.PRIVATE)}
                />
            </Box>

            <UploadImage
                buttonLabel='Upload Icon'
                loading={uploadFileLoader}
                value={formik.values.icon}
                onChange={handleFileChange}
                remove={handleRemoveIcon}
                hideRemove={!uploadFileLoader && formik.values.icon !== default_icon}
            />
        </StyledFormInputWrapper>
    )
}

export default SubnetApiServiceForm
