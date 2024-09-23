/* eslint-disable react/prop-types */
import React, { forwardRef, useCallback, useMemo, useRef } from 'react'

import useMergeRefs from '../../hooks/useMergeRefs'
import Clickable from '../Clickable/Clickable'

import { RadioButtonSize, RadioButtonType } from './RadioButtonConstants'
import L3ComponentProps from '../../types/L3ComponentProps'
import L3Component from '../../types/L3Component'
import Tooltip from '../Tooltip/Tooltip'
import styled, { css } from 'styled-components'

interface RadioButtonProps extends L3ComponentProps {
  className?: string
  componentClassName?: string
  text?: string
  value?: string
  name?: string
  disabled?: boolean
  disabledReason?: string
  defaultChecked?: boolean
  children?: React.ReactNode
  onSelect?: (event: React.ChangeEvent<HTMLInputElement | null>) => void
  checked?: boolean
  retainChildClick?: boolean
  childrenTabIndex?: string
  noLabelAnimation?: boolean
  kind?: RadioButtonType
  size?: RadioButtonSize
  description?: string
}

const RadioButton: L3Component<RadioButtonProps, HTMLInputElement> = forwardRef(
  (
    {
      text = '',
      value = '',
      name = '',
      disabled = false,
      disabledReason,
      defaultChecked = false,
      children,
      onSelect,
      checked,
      retainChildClick = true,
      childrenTabIndex = '0',
      description,
    },
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const mergedRef = useMergeRefs<HTMLInputElement>({ refs: [ref, inputRef] })

    const onChildClick = useCallback(() => {
      if (disabled || !retainChildClick) return
      if (inputRef.current) {
        inputRef.current.checked = true
      }
      if (onSelect) {
        const event = new Event('change', {
          bubbles: true,
        }) as unknown as React.ChangeEvent<HTMLInputElement>
        onSelect(event)
      }
    }, [onSelect, inputRef, disabled, retainChildClick])

    const checkedProps = useMemo(() => {
      if (checked !== undefined) {
        return { checked }
      }
      return { defaultChecked }
    }, [checked, defaultChecked])

    const tooltipContent = disabled ? disabledReason ?? '' : ''

    return (
      <Tooltip content={tooltipContent}>
        <>
          <label>
            <StyledWrapper isDisabled={disabled}>
              <StyledContainer>
                <StyledInput
                  type='radio'
                  value={value}
                  name={name}
                  disabled={disabled}
                  {...checkedProps}
                  onChange={onSelect}
                  ref={mergedRef as React.Ref<HTMLInputElement>}
                />
                <StyledControl isDisabled={disabled} checked={checked ?? false} defaultChecked={defaultChecked} />
              </StyledContainer>
              {text && <StyledLabel isDisabled={disabled}>{text}</StyledLabel>}
              {children && (
                <Clickable onClick={onChildClick} tabIndex={childrenTabIndex}>
                  {children}
                </Clickable>
              )}
            </StyledWrapper>
          </label>
          {description && <span>{description}</span>}
        </>
      </Tooltip>
    )
  },
)

RadioButton.displayName = 'RadioButton'

export default RadioButton

const StyledWrapper = styled.div<{ isDisabled: boolean }>`
  display: flex;
  align-items: center;

  gap: 8px;

  ${props =>
    props.isDisabled &&
    css`
      cursor: not-allowed;
      opacity: 0.6;
    `}
`

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
`

const StyledInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
`

const StyledControl = styled.div<{ checked: boolean; isDisabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;

  border: 3.5px solid ${({ theme }) => theme.body.textColorPrimary};
  box-sizing: border-box;
  border-radius: 50%;

  cursor: pointer;

  :hover {
    border-color: #4ca6f8;
  }
  :active {
    outline: 2px solid ${({ theme }) => theme.body.textColorSecondary};
  }

  ${props =>
    props.checked &&
    css`
      border-color: #4ca6f8;
      border-width: 6px;

      width: 20px;
      height: 20px;
    `}

  ${props =>
    props.isDisabled &&
    css`
      cursor: not-allowed;
    `}
`
const StyledLabel = styled.span<{ isDisabled: boolean }>`
  cursor: pointer;
  color: ${({ theme }) => theme.body.textColorPrimary};

  ${props =>
    props.isDisabled &&
    css`
      cursor: not-allowed;
    `}
`
