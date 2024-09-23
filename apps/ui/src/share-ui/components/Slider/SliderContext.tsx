import React, { createContext, ReactElement, useContext, useMemo, useState } from 'react'
import { createTestIdHelper } from '../../helpers/testid-helper'
import { useDragging, useSliderActionsContextValue, useSliderValues } from './UseSliderHooks'
import { SliderProps } from './Slider'
import {
  SliderContextActions,
  SliderContextInfix,
  SliderContextSelection,
  SliderContextUI,
  SliderTextSize,
} from './SliderConstants'
import { IconType } from '../Icon/IconConstants'

const UiContext = createContext({})
const SelectionContext = createContext({})
const ActionsContext = createContext({})
const InfixContext = createContext({})

export interface SliderProviderProps extends SliderProps {
  children?: ReactElement | ReactElement[]
  infixOptions?: {
    /**
     * Show selected from Slider range value
     */
    indicateSelection?: boolean
    indicateTextSelection?: boolean
    /**
     * Options for initial/start/prefix element, it can be one of:
     *  - Any Component (react component, node, text, number etc.)
     *  - Or it can be an object of options for Icons component (see Icon components props)
     *  - Or it can be an object for Label (Icon, Title - and other components)
     *  - Or it can be Render Props Function witch are getting value and valueText
     */
    prefix?: { icon: IconType } | string | ((value: number, valueText: string) => void) | ReactElement
    /**
     * Options for postfix/end/finishing element. Same as prefix element.
     */
    postfix?: { icon: IconType } | string | ((value: number, valueText: string) => void) | ReactElement
    /**
     * Width of SelectionIndicator (i.e. TextField)
     */
    selectionIndicatorWidth?: string
    textSize?: SliderTextSize
  }
}

export function SliderProvider({
  children,
  ariaLabel,
  ariaLabelledby,
  color,
  'data-testid': dataTestId,
  defaultValue = 0,
  disabled,
  max = 100,
  min = 0,
  onChange,
  ranged,
  showValue,
  size,
  step,
  value = 0,
  valueFormatter,
  valueText = '',
  infixOptions,
}: SliderProviderProps) {
  const shapeTestId = createTestIdHelper(dataTestId || '')
  const { actualValue, actualValueText, getSelectedValue, setSelectedValue } = useSliderValues(
    defaultValue,
    value,
    valueFormatter,
    valueText,
  )

  const [active, setActive] = useState<number>(null as any)
  const [focused, setFocused] = useState<number>(null as any)
  const [dragging, setDragging, getDragging] = useDragging()

  const uiContextValue: SliderContextUI = useMemo(
    () => ({
      active,
      ariaLabel,
      ariaLabelledby,
      color,
      disabled,
      dragging,
      focused,
      size,
      shapeTestId,
      showValue,
    }),
    [active, ariaLabel, ariaLabelledby, color, disabled, dragging, focused, size, shapeTestId, showValue],
  )

  const selectionContextValue: SliderContextSelection = useMemo(
    () => ({
      max,
      min,
      ranged,
      step,
      value: actualValue,
      valueText: actualValueText,
    }),
    [max, min, ranged, step, actualValue, actualValueText],
  )

  const actionsContextValue: SliderContextActions = useSliderActionsContextValue(
    actualValue,
    focused,
    getDragging,
    getSelectedValue,
    max,
    min,
    onChange,
    ranged,
    setActive,
    setFocused,
    setDragging,
    setSelectedValue,
    step,
  )

  return (
    <UiContext.Provider value={uiContextValue}>
      <SelectionContext.Provider value={selectionContextValue}>
        <ActionsContext.Provider value={actionsContextValue}>
          <InfixContext.Provider value={infixOptions}>{children}</InfixContext.Provider>
        </ActionsContext.Provider>
      </SelectionContext.Provider>
    </UiContext.Provider>
  )
}

export function useSliderUi(): SliderContextUI {
  return useContext(UiContext) as SliderContextUI
}

export function useSliderInfix(): SliderContextInfix {
  return useContext(InfixContext) as SliderContextInfix
}

export function useSliderSelection(): SliderContextSelection {
  return useContext(SelectionContext) as SliderContextSelection
}

export function useSliderActions(): SliderContextActions {
  return useContext(ActionsContext) as SliderContextActions
}
