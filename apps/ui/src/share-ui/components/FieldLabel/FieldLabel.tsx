/* eslint-disable react/prop-types */
import React, { FC, ForwardedRef, forwardRef } from 'react'

import Icon from '../Icon/Icon'
import L3ComponentProps from '../../types/L3ComponentProps'
import styled from 'styled-components'
import TypographyPrimary from 'components/Typography/Primary'

interface FieldLabelProps extends L3ComponentProps {
  icon?: string | React.FunctionComponent | null
  iconLabel?: string
  labelText?: string
  labelFor?: string
  iconClassName?: string
  labelClassName?: string
}

// eslint-disable-next-line react/display-name
const FieldLabel: FC<FieldLabelProps> = forwardRef(
  (
    { icon = '', iconLabel = '', labelText = '', labelFor = '', labelClassName = '' },
    ref: ForwardedRef<HTMLLabelElement>,
  ) => {
    if (!labelText) {
      return null
    }

    return (
      <section className='label-component--wrapper'>
        <Icon
          icon={icon}
          id={labelFor}
          clickable={false}
          iconLabel={iconLabel}
          iconType={Icon.type?.ICON_FONT}
        />
        <StyledLabel htmlFor={labelFor} ref={ref} className={labelClassName}>
          <TypographyPrimary value={labelText} size='medium' />
        </StyledLabel>
      </section>
    )
  },
)

export default FieldLabel

const StyledLabel = styled.label`
  color: #fff;
`
