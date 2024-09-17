/* eslint-disable react/prop-types */
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useDebounceEvent from '../../hooks/useDebounceEvent'
import Icon from '../Icon/Icon'
import Loader from '../Loader/Loader'
import FieldLabel from '../FieldLabel/FieldLabel'
import {
    TextFieldAriaLabel,
    TextFieldFeedbackState,
    TextFieldSize,
    TextFieldTextType,
} from './TextFieldConstants'
import { BASE_SIZES } from '../../constants/sizes'
import useMergeRefs from '../../hooks/useMergeRefs'
import Clickable from '../../components/Clickable/Clickable'
import { getTestId } from '../../tests/test-ids-utils'
import { NOOP } from '../../utils/function-utils'
import { ComponentDefaultTestId } from '../../tests/constants'
import { L3ComponentProps, L3Component } from '../../types'
import styled, { css } from 'styled-components'

import IconButton from '../IconButton/IconButton'
import Help from '../Icon/Icons/components/Help'
import { Search } from '../Icon/Icons'

const EMPTY_OBJECT = { primary: '', secondary: '', layout: '' }

interface TextFieldProps extends L3ComponentProps {
    placeholder?: string
    autoComplete?: string
    value?: string | number | null
    onChange?: (value: string) => void
    onBlur?: (event: React.FocusEvent) => void
    onFocus?: (event: React.FocusEvent) => void
    onKeyDown?: (event: React.KeyboardEvent) => void
    debounceRate?: number
    autoFocus?: boolean
    disabled?: boolean
    readonly?: boolean
    setRef?: (node: HTMLElement) => void
    iconName?: string | React.FunctionComponent | null
    secondaryIconName?: string | React.FunctionComponent | null
    title?: string
    size?: TextFieldSize
    validation?: { status?: 'error' | 'success'; text?: string }
    wrapperClassName?: string
    onIconClick?: (icon: string | React.FunctionComponent | null) => void
    clearOnIconClick?: boolean
    labelIconName?: string | React.FunctionComponent | null
    showCharCount?: boolean
    inputAriaLabel?: string
    searchResultsContainerId?: string
    activeDescendant?: string
    iconsNames?: {
        layout: string
        primary: string
        secondary: string
    }
    type?: TextFieldTextType
    maxLength?: number
    trim?: boolean
    role?: string
    required?: boolean
    loading?: boolean
    dataTestId?: string
    secondaryDataTestId?: string
    tabIndex?: number
    name?: string
    defaultIsOpen?: boolean
    onHelpClick?: () => void
    min?: number
}

const TextField: L3Component<TextFieldProps, unknown> & {
    sizes?: typeof BASE_SIZES
    types?: typeof TextFieldTextType
    feedbacks?: TextFieldFeedbackState
} = forwardRef(
    (
        {
            className = '',
            placeholder = '',
            autoComplete = 'off',
            value,
            onChange = NOOP,
            onBlur = NOOP,
            onFocus = NOOP,
            onKeyDown = NOOP,
            debounceRate = 0,
            autoFocus = false,
            disabled = false,
            readonly = false,
            setRef = NOOP,
            iconName,
            secondaryIconName,
            id = 'input',
            title = '',
            size = 'small',
            validation = null,
            onIconClick = NOOP,
            clearOnIconClick = false,
            labelIconName,
            showCharCount = false,
            inputAriaLabel,
            searchResultsContainerId = '',
            activeDescendant = '',
            iconsNames = EMPTY_OBJECT,
            type = TextFieldTextType.TEXT,
            maxLength,
            trim = false,
            required = false,
            loading = false,
            dataTestId,
            secondaryDataTestId,
            tabIndex,
            name,
            defaultIsOpen = false,
            onHelpClick,
            min,
        },
        ref,
    ) => {
        const inputRef = useRef<HTMLInputElement | null>(null)
        const { inputValue, onEventChanged, clearValue } = useDebounceEvent({
            delay: debounceRate,
            onChange,
            initialStateValue: value?.toString(),
            trim,
        })

        const currentStateIconName = useMemo(() => {
            if (secondaryIconName) {
                return inputValue ? secondaryIconName : iconName
            }
            return iconName
        }, [iconName, secondaryIconName, inputValue])

        const onIconClickCallback = useCallback(() => {
            if (disabled) {
                return
            }

            if (clearOnIconClick) {
                if (inputRef.current) {
                    inputRef.current.focus()
                }
                clearValue()
            }
            if (currentStateIconName) onIconClick(currentStateIconName)
        }, [clearValue, currentStateIconName, inputRef, clearOnIconClick, disabled, onIconClick])

        const shouldShowExtraText = showCharCount || (validation && validation.text)
        const isSecondary = secondaryIconName === currentStateIconName
        const isPrimary = iconName === currentStateIconName
        const shouldFocusOnSecondaryIcon = secondaryIconName && isSecondary && !!inputValue

        const mergedRef = useMergeRefs({ refs: [ref, inputRef, setRef] })
        useEffect(() => {
            if (inputRef.current && autoFocus) {
                const animationFrame = requestAnimationFrame(() => inputRef.current?.focus())
                return () => cancelAnimationFrame(animationFrame)
            }
        }, [inputRef, autoFocus])

        const [show, setShow] = useState(defaultIsOpen)

        return (
            <StyledInputWrapper>
                <StyledLabelWrapper>
                    <FieldLabel
                        labelText={title}
                        icon={labelIconName}
                        iconLabel={iconsNames.layout}
                        labelFor={id}
                    />
                    {onHelpClick && (
                        <IconButton
                            onClick={onHelpClick}
                            icon={() => <Help />}
                            kind={IconButton.kinds?.SECONDARY}
                            ariaLabel='Help'
                            size={IconButton.sizes?.XXS}
                        />
                    )}
                </StyledLabelWrapper>
                <>
                    <StyledInnerWrapper>
                        {type === 'search' && (
                            <StyledSearchIconWrapper>
                                <StyledSearchIcon />
                            </StyledSearchIconWrapper>
                        )}
                        <StyledInput
                            isError={validation?.status === 'error'}
                            size={size}
                            className={className}
                            placeholder={placeholder}
                            autoComplete={autoComplete}
                            value={inputValue}
                            onChange={onEventChanged}
                            disabled={disabled}
                            readOnly={readonly}
                            ref={mergedRef}
                            type={type}
                            id={id}
                            name={name}
                            onBlur={onBlur}
                            onFocus={onFocus}
                            onKeyDown={onKeyDown}
                            maxLength={maxLength}
                            role={searchResultsContainerId && 'combobox'} // For voice reader
                            aria-label={inputAriaLabel || placeholder}
                            aria-invalid={validation && validation.status === 'error'}
                            aria-owns={searchResultsContainerId}
                            aria-activedescendant={activeDescendant}
                            required={required}
                            data-testid={
                                dataTestId || getTestId(ComponentDefaultTestId.TEXT_FIELD, id)
                            }
                            tabIndex={tabIndex}
                            min={min}
                        />
                    </StyledInnerWrapper>
                    {loading && (
                        <div>
                            <div className={'input-component__loader'}>
                                <Loader svgClassName='input-component__loader-svg' />
                            </div>
                        </div>
                    )}

                    <div>
                        <Clickable
                            onClick={type === 'search' ? () => setShow(!show) : onIconClickCallback}
                            tabIndex={
                                onIconClick !== NOOP && inputValue && iconName?.length && isPrimary
                                    ? '0'
                                    : '-1'
                            }
                        >
                            <Icon
                                icon={iconName || null}
                                clickable={false}
                                id={id}
                                iconLabel={iconsNames.primary}
                                iconType={Icon.type?.ICON_FONT}
                                ignoreFocusStyle
                                iconSize={size === TextField.sizes?.SMALL ? '32px' : '38px'}
                            />
                        </Clickable>
                        <Clickable
                            onClick={onIconClickCallback}
                            tabIndex={!shouldFocusOnSecondaryIcon ? '-1' : '0'}
                            dataTestId={
                                secondaryDataTestId ||
                                getTestId(ComponentDefaultTestId.TEXT_FIELD_SECONDARY_BUTTON, id)
                            }
                        >
                            <Icon
                                icon={secondaryIconName || null}
                                clickable={false}
                                id={id}
                                iconLabel={iconsNames.secondary}
                                iconType={Icon.type?.ICON_FONT}
                                ignoreFocusStyle
                                iconSize={size === TextField.sizes?.SMALL ? '16px' : '18px'}
                            />
                        </Clickable>
                    </div>
                </>
                {shouldShowExtraText && (
                    <StyledExtraText>
                        {validation && validation.text && (
                            <StyledValidationText>{validation.text}</StyledValidationText>
                        )}
                        {showCharCount && (
                            <span
                                className='input-component__sub-text-container-counter'
                                aria-label={TextFieldAriaLabel.CHAR}
                            >
                                {(inputValue && inputValue.length) || 0}
                            </span>
                        )}
                    </StyledExtraText>
                )}
            </StyledInputWrapper>
        )
    },
)

Object.assign(TextField, {
    sizes: BASE_SIZES,
    feedbacks: TextFieldFeedbackState,
    types: TextFieldTextType,
    defaultTestId: ComponentDefaultTestId.TEXT_FIELD,
})

TextField.displayName = 'TextField'

export default TextField

const StyledInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;

    position: relative;
`

const StyledInput = styled.input<{ isError: boolean; size: string; type: string }>`
    display: inline-flex;
    flex-direction: row;
    align-items: flex-start;

    width: 100%;

    font-weight: 500;

    border: none;
    border-radius: ${({ type }) => (type === 'search' ? '50px' : '6px')};

    background: ${({ theme }) => theme.textFiled.primary.bgColor};

    padding: 8px 16px;
    padding-left: ${({ type }) => (type === 'search' ? '40px' : '16px')};

    color: ${({ theme }) => theme.textFiled.primary.color};
    outline: 4px solid ${({ theme }) => theme.textFiled.primary.borderColor};

    &::placeholder {
        color: ${({ theme }) => theme.body.placeHolderColor};
    }

    &:active,
    &:focus {
        border: none;
        outline: none;
        box-shadow: ${({ theme }) => theme.textFiled.primary.activeBoxShadow};

        outline: 4px solid ${({ theme }) => theme.textFiled.primary.activeBorderColor};
        background: ${({ theme }) => theme.textFiled.primary.activeBgColor};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    ${props =>
        props.isError &&
        css`
            outline: 4px solid ${({ theme }) => theme.textFiled.primary.errorBorderColor};
            &:active,
            &:focus {
                outline: 4px solid ${({ theme }) => theme.textFiled.primary.errorBorderColor};
            }
        `}

    ${props =>
        props.size === 'small' &&
        css`
            height: 38px;
        `}
    ${props =>
        props.size === 'large' &&
        css`
            height: 52px;
        `}
`
const StyledValidationText = styled.span`
    color: ${({ theme }) => theme.textFiled.primary.errorColor};
`
const StyledLabelWrapper = styled.div`
    display: flex;
    gap: 4px;
`
const StyledExtraText = styled.div`
    /* position: absolute;
  bottom: -20px; */
`
const StyledSearchIconWrapper = styled.div`
    position: absolute;
    left: 5px;
`

const StyledInnerWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`
const StyledSearchIcon = styled(Search)`
    path {
        fill: ${({ theme }) => theme.body.iconColor};
        stroke: ${({ theme }) => theme.body.iconColor};
    }
`
