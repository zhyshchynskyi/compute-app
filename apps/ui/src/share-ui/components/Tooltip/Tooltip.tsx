/* eslint-disable react/prop-types */
import React, { CSSProperties, ReactElement, useState, useCallback, FC } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Modifier } from 'react-popper'
import Dialog from '../Dialog/Dialog'
import { AnimationType, BASE_SIZES_WITH_NONE, HideShowEvent, JustifyType } from '../../constants'
import { DialogPosition } from '../../constants/positions'
import L3ComponentProps from '../../types/L3ComponentProps'
import { TooltipArrowPosition, TooltipSize, TooltipTheme } from './TooltipConstants'
import { ElementContent } from '../../types/ElementContent'
import { MoveBy } from '../../types/MoveBy'
import styled, { css } from 'styled-components'

export interface TooltipProps extends L3ComponentProps {
  children: ReactElement | Array<ReactElement>
  content: ElementContent
  style?: CSSProperties
  arrowPosition?: TooltipArrowPosition
  paddingSize?: keyof typeof BASE_SIZES_WITH_NONE
  moveBy?: MoveBy
  theme?: TooltipTheme
  justify?: JustifyType
  getContainer?: () => HTMLElement
  hideDelay?: number
  showDelay?: number
  disableDialogSlide?: boolean
  animationType?: AnimationType
  withoutDialog?: boolean
  containerSelector?: string
  immediateShowDelay?: number
  tip?: boolean
  shouldShowOnMount?: boolean
  hideWhenReferenceHidden?: boolean
  onTooltipHide?: () => void
  onTooltipShow?: () => void
  modifiers?: Array<Modifier<object>>
  position?: DialogPosition
  showTrigger?: HideShowEvent | Array<HideShowEvent>
  hideTrigger?: HideShowEvent | Array<HideShowEvent>
  showOnDialogEnter?: boolean
  referenceWrapperClassName?: string
  tooltipSize?: TooltipSize
}

interface TooltipComponent extends FC<TooltipProps> {
  positions?: typeof DialogPosition
  tooltipSize?: typeof TooltipSize
}

const IMMEDIATE_SHOW_THRESHOLD_MS = 1500

const globalState: { lastTooltipHideTS: number | null; openTooltipsCount: number } = {
  lastTooltipHideTS: null,
  openTooltipsCount: 0,
}

const Tooltip: TooltipComponent = props => {
  const [wasShown, setWasShown] = useState(false)

  const getContainer = useCallback(() => {
    return document.getElementById('tooltips-container') || document.querySelector('body')
  }, [])

  const renderTooltipContent = useCallback(() => {
    const { content, style, tooltipSize = TooltipSize.Small } = props
    if (!content) {
      return <></>
    }
    let contentValue
    if (typeof content === 'function') {
      contentValue = (content as () => ReactElement)()
    } else if (React.isValidElement(content)) {
      contentValue = content
    } else if (typeof content === 'string' && content) {
      contentValue = content
    }

    if (!contentValue) {
      return <></>
    }

    return (
      <StyledTooltip style={style} size={tooltipSize}>
        {contentValue}
      </StyledTooltip>
    )
  }, [props])

  const onTooltipShow = useCallback(() => {
    if (!wasShown) {
      const { onTooltipShow } = props
      globalState.openTooltipsCount += 1
      setWasShown(true)
      onTooltipShow && onTooltipShow()
    }
  }, [wasShown, props])

  const onTooltipHide = useCallback(() => {
    if (wasShown) {
      const { onTooltipHide } = props
      globalState.lastTooltipHideTS = Date.now()
      globalState.openTooltipsCount += 1
      setWasShown(false)
      onTooltipHide && onTooltipHide()
    }
  }, [wasShown, props])

  const getTimeSinceLastTooltip = useCallback(() => {
    if (globalState.openTooltipsCount > 0) {
      return 0
    }
    return globalState.lastTooltipHideTS ? Date.now() - globalState.lastTooltipHideTS : Infinity
  }, [])

  const getShowDelay = useCallback(() => {
    const { showDelay = 0, immediateShowDelay } = props
    const timeSinceLastTooltip = getTimeSinceLastTooltip()
    if (
      (immediateShowDelay === 0 || immediateShowDelay) &&
      timeSinceLastTooltip < IMMEDIATE_SHOW_THRESHOLD_MS
    ) {
      return {
        showDelay: immediateShowDelay,
        preventAnimation: true,
      }
    }
    return {
      showDelay,
      preventAnimation: false,
    }
  }, [props, getTimeSinceLastTooltip])

  const {
    withoutDialog,
    moveBy,
    justify,
    children,
    getContainer: getContainerProp,
    theme,
    paddingSize,
    tip,
    showTrigger,
    hideTrigger,
    showOnDialogEnter,
  } = props

  if (!children) {
    return null
  }

  if (withoutDialog) {
    return renderTooltipContent()
  }

  const content = renderTooltipContent
  const dialogProps = {
    ...props,
    startingEdge: justify,
    tooltip: tip,
    content,
    getContainer: getContainerProp || getContainer,
    moveBy,
    tooltipClassName: `l3-style-arrow l3-style-arrow-${theme} padding-size-${paddingSize}`,
    animationType: AnimationType.EXPAND,
    onDialogDidHide: onTooltipHide,
    onDialogDidShow: onTooltipShow,
    getDynamicShowDelay: getShowDelay,
    showTrigger,
    hideTrigger,
    showOnDialogEnter,
  }

  return <Dialog {...dialogProps}>{children}</Dialog>
}

Tooltip.defaultProps = {
  arrowPosition: TooltipArrowPosition.CENTER,
  moveBy: { main: 4, secondary: 0 },
  theme: TooltipTheme.Dark,
  position: DialogPosition.TOP,
  justify: JustifyType.CENTER,
  hideDelay: 0,
  showDelay: 300,
  disableDialogSlide: true,
  animationType: AnimationType.EXPAND,
  withoutDialog: false,
  containerSelector: '#tooltips-container',
  tip: true,
  hideWhenReferenceHidden: false,
  modifiers: [],
  showTrigger: HideShowEvent.MOUSE_ENTER,
  hideTrigger: HideShowEvent.MOUSE_LEAVE,
  showOnDialogEnter: false,
  referenceWrapperClassName: '',
  tooltipSize: TooltipSize.Small,
}

const StyledTooltip = styled.div<{ size: string }>`
  position: relative;
  display: inline-block;
  border-radius: 4px;
  padding: 8px 12px;

  box-shadow: 0 6px 20px rgb(0 0 0 / 20%);

  max-width: 50vw;
  word-break: break-word;
  color: ${({ theme }) => theme.body.textColorPrimary};
  font-weight: 500 !important;

  background: ${({ theme }) => theme.body.backgroundColorPrimary};
  border: 2px solid #000;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(150px);

  a.tooltip-white-link {
    color: #fff;
  }
  ${props =>
    props.size === 'small' &&
    css`
      padding: 4px 8px;
      font-size: 12px;
      line-height: 20px;
    `}
  ${props =>
    props.size === 'large' &&
    css`
      padding: 8px 12px;
      font-size: 18px;
      line-height: 28px;
    `}
`

Object.assign(Tooltip, {
  positions: DialogPosition,
  tooltipSize: TooltipSize,
})

export default Tooltip
