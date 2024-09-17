/* eslint-disable react/require-default-props,react/forbid-prop-types */
import { SIZES } from '../../constants/sizes'
import { useCallback, useMemo, useRef, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import Select, { components } from 'react-select'
// eslint-disable-next-line import/no-extraneous-dependencies
import AsyncSelect from 'react-select/async'
import { noop as NOOP } from 'lodash-es'
// eslint-disable-next-line import/no-extraneous-dependencies
import { WindowedMenuList } from 'react-windowed-select'
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types'
import MenuComponent from './components/menu/menu'
import DropdownIndicatorComponent from './components/DropdownIndicator/DropdownIndicator'
import OptionComponent from './components/option/option'
import SingleValueComponent from './components/singleValue/singleValue'
import ClearIndicatorComponent from './components/ClearIndicator/ClearIndicator'
import MultiValueContainer from './components/MultiValueContainer/MultiValueContainer'
import { defaultCustomStyles, DROPDOWN_ID } from './DropdownConstants'
import { customTheme } from './Dropdown.styles'
import Control from './components/Control/Control'
import { DROPDOWN_TAG_COLORS, MENU_WRAPPER_CLASS_NAME, DROPDOWN_KINDS } from './dropdown-constants'
import styled, { useTheme } from 'styled-components'

const Dropdown = ({
  placeholder,
  disabled,
  onMenuOpen,
  onMenuClose,
  onFocus,
  onBlur,
  onChange: customOnChange,
  searchable,
  options,
  defaultValue,
  value: customValue,
  noOptionsMessage,
  openMenuOnFocus,
  openMenuOnClick,
  clearable,
  // eslint-disable-next-line react/prop-types
  OptionRenderer,
  optionRenderer,
  // eslint-disable-next-line react/prop-types
  ValueRenderer,
  valueRenderer,
  menuRenderer,
  menuPlacement,
  rtl,
  size,
  asyncOptions,
  cacheOptions,
  defaultOptions,
  isVirtualized,
  menuPortalTarget,
  maxMenuHeight,
  // eslint-disable-next-line react/prop-types
  menuIsOpen,
  tabIndex,
  id,
  autoFocus,
  multi = false,
  multiline = false,
  onOptionRemove: customOnOptionRemove,
  // eslint-disable-next-line react/prop-types
  onOptionSelect,
  // eslint-disable-next-line react/prop-types
  onClear,
  onInputChange,
  closeMenuOnSelect = !multi,
  withMandatoryDefaultOptions,
  isOptionSelected,
  insideOverflowContainer,
  insideOverflowWithTransformContainer,
  ref,
  tooltipContent,

  // eslint-disable-next-line react/prop-types
  searchIcon,
}) => {
  const theme = useTheme()
  const customStyles = {
    control: provided => ({
      ...provided,
      border: `4px solid ${theme.body.textareaBorder}`,
      '&:focus-within': {
        boxShadow: `0 0 0 2px black`,
      },
      '&:hover': {
        boxShadow: `0 0 0 2px black`,
      },
      background: theme.textFiled.primary.bgColor,
    }),
    container: provided => ({
      ...provided,
      borderRadius: '8px',
    }),
    input: provided => ({
      ...provided,
      color: theme.textFiled.primary.color,
    }),
    menu: provided => ({
      ...provided,
      zIndex: 10,
      background: theme.body.backgroundColorPrimary,
      border: `1px solid ${theme.body.secondaryBorderBackground}`,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#AAA' : 'transparent',
      color: theme.body.textColorPrimary,
      '&:hover': {
        backgroundColor: theme.body.placeHolderColor,
      },
    }),
    placeholder: provided => ({
      ...provided,
      color: theme.body.placeHolderColor,
    }),
  }

  const controlRef = useRef()
  const overrideDefaultValue = useMemo(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue)
        ? defaultValue.map(df => ({ ...df, isMandatory: true }))
        : { ...defaultValue, isMandatory: true }
    }

    return defaultValue
  }, [defaultValue])

  const [selected, setSelected] = useState(overrideDefaultValue || [])
  const [isDialogShown, setIsDialogShown] = useState(false)
  const finalOptionRenderer = optionRenderer || OptionRenderer
  const finalValueRenderer = valueRenderer || ValueRenderer
  const isControlled = !!customValue
  const selectedOptions = customValue ?? selected
  const selectedOptionsMap = useMemo(() => {
    if (Array.isArray(selectedOptions)) {
      return selectedOptions.reduce((acc, option) => ({ ...acc, [option.value]: option }), {})
    }
    return {}
  }, [selectedOptions])

  const value = multi ? selectedOptions : customValue

  const Menu = useCallback(
    props => <MenuComponent {...props} Renderer={menuRenderer} />,
    [menuRenderer],
  )

  const DropdownIndicator = useCallback(
    props => <DropdownIndicatorComponent {...props} size={size} searchIcon={searchIcon} />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [size],
  )

  const Option = useCallback(
    props => <OptionComponent {...props} Renderer={finalOptionRenderer} />,
    [finalOptionRenderer],
  )

  const Input = useCallback(
    props => <components.Input {...props} aria-label='Dropdown input' />,
    [],
  )

  const SingleValue = useCallback(
    props => (
      <SingleValueComponent
        {...props}
        Renderer={finalValueRenderer}
        selectedOption={selectedOptions[0]}
      />
    ),
    [finalValueRenderer, selectedOptions],
  )

  const ClearIndicator = useCallback(
    props => <ClearIndicatorComponent {...props} size={size} />,
    [size],
  )

  const onOptionRemove = useMemo(() => {
    if (customOnOptionRemove) {
      return (optionValue, e) => customOnOptionRemove(selectedOptionsMap[optionValue], e)
    }
    return function (optionValue, e) {
      setSelected(selected.filter(option => option.value !== optionValue))
      e.stopPropagation()
    }
  }, [customOnOptionRemove, selected, selectedOptionsMap])

  const customProps = useMemo(
    () => ({
      selectedOptions,
      onSelectedDelete: onOptionRemove,
      setIsDialogShown,
      isDialogShown,
      isMultiline: multiline,
      insideOverflowContainer,
      insideOverflowWithTransformContainer,
      controlRef,
      tooltipContent,
    }),
    [
      selectedOptions,
      onOptionRemove,
      isDialogShown,
      multiline,
      insideOverflowContainer,
      insideOverflowWithTransformContainer,
      tooltipContent,
    ],
  )
  const onChange = (option, event) => {
    if (customOnChange) {
      customOnChange(option, event)
    }

    switch (event.action) {
      case 'select-option': {
        const selectedOption = multi ? event.option : option

        if (onOptionSelect) {
          onOptionSelect(selectedOption)
        }

        if (!isControlled) {
          setSelected([...selected, selectedOption])
        }
        break
      }

      case 'clear':
        if (onClear) {
          onClear()
        }

        if (!isControlled) {
          if (withMandatoryDefaultOptions) setSelected(overrideDefaultValue)
          else setSelected([])
        }
        break
    }
  }

  const DropDownComponent = asyncOptions ? AsyncSelect : Select

  const asyncAdditions = {
    ...(asyncOptions && {
      loadOptions: asyncOptions,
      cacheOptions,
      ...(defaultOptions && { defaultOptions }),
    }),
  }

  const additions = {
    ...(!asyncOptions && { options }),
    ...(multi && {
      isMulti: true,
    }),
  }

  const closeMenuOnScroll = useCallback(
    event => {
      const scrolledElement = event.target
      if (scrolledElement?.parentElement?.classList.contains(MENU_WRAPPER_CLASS_NAME)) {
        return false
      }
      return insideOverflowContainer || insideOverflowWithTransformContainer
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [insideOverflowContainer, id, insideOverflowWithTransformContainer],
  )

  return (
    <StyledWrapper>
      <DropDownComponent
        selectProps={customProps}
        components={{
          DropdownIndicator,
          Menu,
          ClearIndicator,
          Input,
          Option,
          Control,
          SingleValue,
          ...(multi && {
            MultiValue: NOOP, // We need it for react-select to behave nice with "multi"
            ValueContainer: MultiValueContainer,
          }),
          ...(isVirtualized && { MenuList: WindowedMenuList }),
        }}
        // When inside scroll we set the menu position by js and we can't follow the drop down location while use scrolling
        closeMenuOnScroll={closeMenuOnScroll}
        size={size}
        noOptionsMessage={noOptionsMessage}
        placeholder={placeholder}
        isDisabled={disabled}
        isClearable={clearable}
        isSearchable={searchable}
        defaultValue={defaultValue}
        value={value}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onInputChange={onInputChange}
        openMenuOnFocus={openMenuOnFocus}
        openMenuOnClick={openMenuOnClick}
        isRtl={rtl}
        styles={customStyles}
        theme={customTheme}
        maxMenuHeight={maxMenuHeight}
        menuPortalTarget={menuPortalTarget}
        menuPlacement={menuPlacement}
        menuIsOpen={menuIsOpen}
        tabIndex={tabIndex}
        id={id}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        closeMenuOnSelect={closeMenuOnSelect}
        ref={ref}
        withMandatoryDefaultOptions={withMandatoryDefaultOptions}
        isOptionSelected={isOptionSelected}
        aria-details={tooltipContent}
        {...asyncAdditions}
        {...additions}
      />
    </StyledWrapper>
  )
}

Dropdown.size = SIZES
Dropdown.tagColors = DROPDOWN_TAG_COLORS
Dropdown.kind = DROPDOWN_KINDS

Dropdown.defaultProps = {
  className: '',
  placeholder: '',
  onMenuOpen: NOOP,
  onMenuClose: NOOP,
  onKeyDown: NOOP,
  onFocus: NOOP,
  onBlur: NOOP,
  onChange: NOOP,
  onInputChange: NOOP,
  searchable: true,
  options: [],
  menuPlacement: 'bottom',
  noOptionsMessage: NOOP,
  clearable: true,
  size: SIZES.MEDIUM,
  extraStyles: defaultCustomStyles,
  tabIndex: '0',
  onOptionRemove: undefined,
  id: DROPDOWN_ID,
  autoFocus: false,
  closeMenuOnSelect: undefined,
  ref: undefined,
  withMandatoryDefaultOptions: false,
  insideOverflowContainer: false,
  insideOverflowWithTransformContainer: false,
  tooltipContent: '',
  kind: DROPDOWN_KINDS.PRIMARY,
}

Dropdown.propTypes = {
  /**
   * Custom style
   */
  className: PropTypes.string,
  /**
   * Placeholder to show when no value was selected
   */
  placeholder: PropTypes.string,
  /**
   * If set to true, dropdown will be disabled
   */
  disabled: PropTypes.bool,
  /**
   * Called when menu is opened
   */
  onMenuOpen: PropTypes.func,
  /**
   * Called when menu is closed
   */
  onMenuClose: PropTypes.func,
  /**
   * Called when key is pressed in the dropdown
   */
  onKeyDown: PropTypes.func,
  /**
   * Called when focused
   */
  onFocus: PropTypes.func,
  /**
   * Called when blurred
   */
  onBlur: PropTypes.func,
  /**
   * Called when selected value has changed
   */
  onChange: PropTypes.func,
  /**
   * Called when the dropdown's input changes.
   */
  onInputChange: PropTypes.func,
  /**
   * If true, search in options will be enabled
   */
  searchable: PropTypes.bool,
  /**
   * The dropdown options
   */
  options: PropTypes.arrayOf(PropTypes.object),
  /**
   * Text to display when there are no options
   */
  noOptionsMessage: PropTypes.func,
  /**
   * If set to true, the menu will open when focused
   */
  openMenuOnFocus: PropTypes.bool,
  /**
   * If set to true, the menu will open when clicked
   */
  openMenuOnClick: PropTypes.bool,
  /**
   * If set to true, clear button will be added
   */
  clearable: PropTypes.bool,
  /**
   * custom option render function
   */
  optionRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * custom value render function
   */
  valueRenderer: PropTypes.func,
  /**
   * custom menu render function
   */
  menuRenderer: PropTypes.func,
  /**
   * Default placement of the Dropdown menu in relation to its control. Use "auto" to flip the menu when there isn't enough space below the control.
   */
  menuPlacement: PropTypes.oneOf(['bottom', 'top', 'auto']),
  /**
   * If set to true, the dropdown will be in Right to Left mode
   */
  rtl: PropTypes.bool,
  /**
   * Set default selected value
   */
  defaultValue: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ),
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ]),
  /**
   * The component's value.
   * When passed, makes this a [controlled](https://reactjs.org/docs/forms.html#controlled-components) component.
   */
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
    ),
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ]),
  /**
   * Select menu size from `Dropdown.size` - Dropdown.size.LARGE | Dropdown.size.MEDIUM | Dropdown.size.SMALL
   */
  size: PropTypes.string,
  /**
   * If provided Dropdown will work in async mode. Can be either promise or callback
   */
  asyncOptions: PropTypes.oneOfType([
    PropTypes.func, // callback
    PropTypes.shape({
      then: PropTypes.func.isRequired,
      catch: PropTypes.func.isRequired,
    }), // Promise
  ]),
  /**
   * If set to true, fetched async options will be cached
   */
  cacheOptions: PropTypes.bool,
  /**
   * If set, `asyncOptions` will be invoked with its value on mount and the resolved results will be loaded
   */
  defaultOptions: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.object)]),
  /**
   * If set to true, the menu will use virtualization. Virtualized async works only with
   */
  isVirtualized: PropTypes.bool,
  /**
   * Whether the menu should use a portal, and where it should attach
   */
  menuPortalTarget: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  /**
   * Custom function to override existing styles (similar to `react-select`'s `style` prop), for example: `base => ({...base, color: 'red'})`, where `base` is the component's default styles
   */
  extraStyles: PropTypes.func,
  /**
   * Maximum height of the menu before scrolling
   */
  maxMenuHeight: PropTypes.number,
  /**
   * Tab index for keyboard navigation purposes
   */
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * ID for the select container
   */
  id: PropTypes.string,
  /**
   * focusAuto when component mount
   */
  autoFocus: PropTypes.bool,
  /**
   * If set to true, the dropdown will be in multi-select mode.
   * When in multi-select mode, the selected value will be an array,
   * and it will be displayed as our [`<Tags>`](/?path=/docs/components-tags--sandbox) component.
   */
  multi: PropTypes.bool,
  /**
   * If set to true together with `multi`, it will make the dropdown expand to multiple lines when new values are selected.
   */
  multiline: PropTypes.bool,
  /**
  Pass closeMenuOnSelect to close the multi choose any time an options is chosen.
  */
  closeMenuOnSelect: PropTypes.bool,
  /**
   * callback to be called when `multiline` is `true` and the option is removed
   */
  onOptionRemove: PropTypes.func,
  /**
   Pass Ref for reference of the actual dropdown component
   */
  ref: PropTypes.func,
  /**
   The options set by default will be set as mandatory and the user will not be able to cancel their selection
   */
  withMandatoryDefaultOptions: PropTypes.bool,
  /**
   * Override the built-in logic to detect whether an option is selected.
   */
  isOptionSelected: PropTypes.func,
  /**
   * For display the drop down menu in overflow hidden/scroll container.
   */
  insideOverflowContainer: PropTypes.bool,
  /**
   * For display the drop down menu in overflow hidden/scroll container which contains transform css function usage.
   */
  insideOverflowWithTransformContainer: PropTypes.bool,
  /**
   * When content is passed, the dropdown will include a tooltip on the dropdown's value.
   */
  tooltipContent: PropTypes.string,

  kind: PropTypes.DROPDOWN_KINDS,
}

export default Dropdown

const StyledWrapper = styled.div``
