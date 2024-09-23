import styled from 'styled-components'
import { Field } from 'formik'
import Textarea from 'share-ui/components/Textarea/Textarea'

import TypographyPrimary from 'components/Typography/Primary'
import { useEffect, useRef } from 'react'

type TextareaProps = {
  setFieldValue?: any
  label: string
  value: string
  fieldName: string
  triggerResize?: number
  minHeight?: number
  placeholder?: string
}

const TextareaFormik = ({ label, value, fieldName, triggerResize, minHeight, ...props }: TextareaProps) => {
  const textareaRef = useRef(null as any)
  const input_name = fieldName

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      // console.log('SHOULD RESIZE')
      // textarea.style.height = 'auto' // Reset the height to auto to recalculate the height
      // textarea.style.height = `${textarea.scrollHeight}px` // Set the height to the scroll height of the content
      setTimeout(function () {
        textarea.style.height = 'auto' // Reset the height to auto to recalculate the height
        textarea.style.height = `${textarea.scrollHeight}px`
      }, 100)
    }
  }, [value, triggerResize])

  return (
    <Field name={input_name}>
      {(formik: any) => {
        const { field, meta, form } = formik
        const onHandleChange = (e: any) => {
          form.setFieldValue(field.name, e)
        }
        return (
          <StyledTextareaWrapper minHeight={minHeight}>
            <TypographyPrimary value={label} size={'medium'} />
            <Textarea
              ref={textareaRef}
              hint=''
              value={value}
              onChange={onHandleChange}
              maxLenght={10000}
              validation={{
                text: meta.error,
                status: meta.error && 'error',
              }}
              {...props}
            />
          </StyledTextareaWrapper>
        )
      }}
    </Field>
  )
}

export default TextareaFormik

const StyledTextareaWrapper = styled.div<{ minHeight?: number }>`
  font: var(--font-general-label);
  line-height: 22px;
  font-size: 10px;

  display: flex;
  flex-direction: column;
  gap: 5px;

  .components-Textarea-Textarea-module__textarea--Qy3d2 {
    font-size: 14px;
    border: 3px solid ${({ theme }) => theme.body.textareaBorder};
    color: ${({ theme }) => theme.body.textColorPrimary};
    background: ${({ theme }) => theme.body.textAreaBgColor};
    &::placeholder {
      color: ${({ theme }) => theme.body.placeHolderColor};
    }
  }
  textarea {
    min-height: ${({ minHeight }) => (minHeight ? `${minHeight}px` : '100px')};
    max-height: calc(100vh - 400px);
  }
`
