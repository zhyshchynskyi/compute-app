import { useState } from 'react'
import styled from 'styled-components'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { StyledText } from 'pages/Billing/panels/General'

export const AddCreditToggleButtonGroup = ({ setAmount }: { setAmount: (value: string) => void }) => {
  const [value, setValue] = useState('25')

  return (
    <ToggleButtonGroup
      color='primary'
      value={''}
      exclusive
      onChange={(event, value) => {
        setValue(value)
        setAmount(value)
      }}
      aria-label='Platform'
    >
      <StyledLeftToggleButton value='25' buttonValue={value} labelValue='25' size='small'>
        <StyledText>$25</StyledText>
      </StyledLeftToggleButton>

      <StyledToggleButton value='50' buttonValue={value} labelValue='50' size='small'>
        <StyledText>$50</StyledText>
      </StyledToggleButton>
      <StyledRightToggleButton value='100' buttonValue={value} labelValue='100' size='small'>
        <StyledText>$100</StyledText>
      </StyledRightToggleButton>
    </ToggleButtonGroup>
  )
}

export const StyledToggleButton = styled(ToggleButton)<{ buttonValue: string; labelValue: string }>`
  &&& {
    padding: 9px;
    font-weight: 600;
    color: ${({ theme, buttonValue, labelValue }) =>
      buttonValue === labelValue ? theme.basicForeground.white : theme.body.textColorPrimary};
    background: ${({ theme, buttonValue, labelValue }) =>
      buttonValue === labelValue ? theme.basicForeground.black : 'transparent'};

    border: ${({ theme, buttonValue, labelValue }) => (buttonValue === labelValue ? '' : theme.body.secondaryBorder)};

    &:hover {
      background-color: #000;
      color: #fff;
      border: 1px solid #000;
    }
  }
`

export const StyledLeftToggleButton = styled(StyledToggleButton)`
  &&& {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
`

export const StyledRightToggleButton = styled(StyledToggleButton)`
  &&& {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`
