import { FormikProvider } from 'formik'
import styled from 'styled-components'
import withRenderModal from 'hocs/withRenderModal'

import { useModal } from 'hooks'

import useEditPodTemplate, { UseEditPodTemplateProps } from './useEditPodTemplate'
import TemplateForm from 'pages/template/components/TemplateForm'
import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'
import MainModal from 'modals/MainModal'

interface EditPodTemplateModalProps {
  data: UseEditPodTemplateProps
}

const EditPodTemplateModal = ({
  data: { template, handleEditTemplate, new_template, handleClearOverrides },
}: EditPodTemplateModalProps) => {
  const { closeModal } = useModal()
  const { formik, credentials, clearOverrides } = useEditPodTemplate({
    template,
    handleEditTemplate,
    new_template,
    handleClearOverrides,
  })

  return (
    <FormikProvider value={formik}>
      <MainModal
        title='Edit Template'
        onClose={() => closeModal('edit-pod-template-modal')}
        customButtons={
          <>
            <ButtonPrimary onClick={clearOverrides} size={Button.sizes?.MEDIUM}>
              Clear Overrides
            </ButtonPrimary>
            <ButtonPrimary onClick={formik.handleSubmit} size={Button.sizes?.MEDIUM} loading={false}>
              Set Overrides
            </ButtonPrimary>
          </>
        }
        onSubmit={() => {}}
      >
        <TemplateForm credentials={credentials} label='' formik={formik} />
      </MainModal>
    </FormikProvider>
  )
}

export default withRenderModal('edit-pod-template-modal')(EditPodTemplateModal)

export const StyledButtonWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`
