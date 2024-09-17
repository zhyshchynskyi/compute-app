import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { useTheme } from 'styled-components'

interface ToggleButtonProps {
  options: { label: string; value: string | number }[]
  value: string | number | null
  onChange: (value: string | number | null) => void
  icon?: JSX.Element
}

const CustomToggleButton = ({ value, onChange, options, icon }: ToggleButtonProps) => {
  const theme = useTheme()

  const colorsSelected = {
    color: '#FFF',
    background: '#000',
    border: `1px solid #000`,
  }
  const colors = {
    color: theme?.body.textColorSecondary,
    background: 'transparent',
    border: `1px solid ${theme.body.secondaryBorderBackground}`,
  }

  const styles = {
    '.css-k9c1x3-MuiButtonBase-root-MuiToggleButton-root.Mui-selected': colorsSelected,
    '.css-1ke8krz-MuiButtonBase-root-MuiToggleButton-root.Mui-selected': colorsSelected,
    '.css-npkewm-MuiButtonBase-root-MuiToggleButton-root.Mui-selected': colorsSelected,
    '.css-k9c1x3-MuiButtonBase-root-MuiToggleButton-root': colors,
    '.css-1ke8krz-MuiButtonBase-root-MuiToggleButton-root': colors,
    '.css-npkewm-MuiButtonBase-root-MuiToggleButton-root': colors,
  }

  return (
    <ToggleButtonGroup
      color='primary'
      value={value}
      exclusive
      onChange={(_, value) => onChange(value)}
      aria-label='Platform'
      sx={styles}
    >
      {options.map((option: { label: string; value: string | number }, index: number) => (
        <ToggleButton
          key={index}
          value={option.value}
          size='small'
          sx={{
            ...(index === 0 && {
              borderTopLeftRadius: '10px',
              borderBottomLeftRadius: '10px',
            }),
            ...(index === options.length - 1 && {
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px',
            }),
            fontWeight: 600,
          }}
        >
          {icon && icon}
          <Typography sx={{ marginLeft: '5px' }} fontSize={14}>
            {option.label}
          </Typography>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}

export default CustomToggleButton
