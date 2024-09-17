import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import { useTheme } from 'styled-components'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export default function InputFileUpload({
  label,
  onChange,
}: {
  label: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
  const theme = useTheme()

  return (
    <>
      <Button
        component='label'
        role={undefined}
        variant='contained'
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        sx={{
          borderRadius: '60px',
          background: theme?.button.primary.bgColor,
          color: theme?.button.primary.color,
          '&:hover': {
            background: theme?.button.primary.hoverBgColor,
          },
          '&:active': {
            outline: `1px solid ${theme?.button.primary.pressedBorderColor}`,
            background: theme?.button.primary.pressedBgColor,
          },
          fontWeight: 500,
        }}
      >
        {label}
        <VisuallyHiddenInput type='file' onChange={onChange} />
      </Button>
    </>
  )
}
