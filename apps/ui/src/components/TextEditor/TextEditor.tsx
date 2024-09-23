import TypographyPrimary from 'components/Typography/Primary'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'

type TextEditorProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
}

const TextEditor = ({ value, onChange, placeholder, label }: TextEditorProps) => {
  return (
    <StyledRoot>
      {label && <TypographyPrimary value={label} size='medium' />}
      <StyledReactQuill value={value} onChange={(value: string) => onChange(value)} placeholder={placeholder || ''} />
    </StyledRoot>
  )
}

export default TextEditor

const StyledRoot = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;
`

const StyledReactQuill = styled(ReactQuill)`
  .ql-editor {
    min-height: 200px;
    font-size: 16px;
  }
  .ql-toolbar {
    background-color: ${({ theme }) => `${theme.body.cardBgColor}`};
  }
  .ql-stroke {
    stroke: ${({ theme }) => `${theme.body.iconColor}`};
  }
  .ql-fill {
    fill: ${({ theme }) => `${theme.body.iconColor}`};
  }
  .ql-container {
    border: ${({ theme }) => `${theme.body.secondaryBorder}`};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    border-width: 2px;

    background-color: ${({ theme }) => `${theme.textFiled.primary.bgColor}`};
  }
  .ql-toolbar {
    background-color: ${({ theme }) => `${theme.body.cardBgColor}`};
    border: ${({ theme }) => `${theme.body.secondaryBorder}`};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    border-width: 2px;
  }

  .ql-picker {
    color: ${({ theme }) => `${theme.body.textColorPrimary}`};
  }
  .ql-picker-options {
    background-color: ${({ theme }) => `${theme.body.backgroundColorPrimary}`};
    border: ${({ theme }) => `${theme.body.secondaryBorder}`};
    color: ${({ theme }) => `${theme.body.textColorPrimary}`};

    border-radius: 8px;
  }
  .ql-picker-item {
    color: ${({ theme }) => `${theme.body.textColorPrimary}`};
  }

  .ql-editor::before {
    color: ${({ theme }) => `${theme.body.placeHolderColor}`};
    /* font-style: italic; */
  }

  color: ${({ theme }) => `${theme.body.textColorPrimary}`};
`
