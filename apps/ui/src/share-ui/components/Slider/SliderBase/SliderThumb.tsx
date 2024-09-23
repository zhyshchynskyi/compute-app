import React, { FC, useEffect, useRef } from 'react'
// import { DialogPosition } from "../../../constants/positions";
import { NOOP } from '../../../utils/function-utils'
// import Tooltip from "../../Tooltip/Tooltip";
// import { TOOLTIP_SHOW_DELAY } from "../SliderConstants";
import { bem } from '../SliderHelpers'
import { useSliderActions, useSliderSelection, useSliderUi } from '../SliderContext'
import L3ComponentProps from '../../../types/L3ComponentProps'
import styled from 'styled-components'

// const tooltipPosition = DialogPosition.TOP;

export interface SliderThumbProps extends L3ComponentProps {
  /**
   * Consumer/Custom/Extra `class names` to be added to the Component's-Root-Node
   */
  className?: string
  /**
   * Consumer/Custom/Extra `class names` to be added to the Component's-Root-Node
   */
  index?: number
  /**
   * On SliderThumb move callback
   */
  onMove?: (event: PointerEvent) => void
  /**
   * Position (i.e. offset) from start of track/rail, according to value
   */
  position?: number
}

const SliderThumb: FC<SliderThumbProps> = ({ className, index = 0, onMove = NOOP, position = 0 }) => {
  const { max, min, ranged, value: valueOrValues, valueText: valueOrValuesText } = useSliderSelection()
  const value = ranged ? (valueOrValues as unknown as number[])[index] : (valueOrValues as number)
  const valueText = ranged ? (valueOrValuesText as unknown as string[])[index] : (valueOrValuesText as string)
  const { ariaLabel, ariaLabelledby, disabled, dragging, focused, shapeTestId, showValue } = useSliderUi()
  const { setActive, setFocused, setDragging } = useSliderActions()
  const ref = useRef(null)

  function handleBlur() {
    setFocused(null)
    setActive(null)
  }

  function handleFocus() {
    setFocused(index)
    setActive(index)
  }

  function handlePointerLeave() {
    setActive(null)
  }

  function handlePointerDown(e: React.PointerEvent) {
    e.stopPropagation()
    setDragging(index)
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', stopMove)
  }

  function stopMove() {
    setDragging(null)
    document.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerup', stopMove)
  }

  useEffect(() => {
    if (focused === index && ref && ref.current) {
      ref.current.focus()
    }
  }, [focused, index])

  return (
    // <Tooltip
    //   // @ts-ignore TODO TS-migration the comment can be removed once TooltipProps will extend DialogProps, once Dialog is converted to TS
    //   open={active === index || dragging === index}
    //   content={showValue ? null : valueText}
    //   position={tooltipPosition}
    //   showDelay={TOOLTIP_SHOW_DELAY}
    // >
    <StyledThumb
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      aria-valuetext={valueText}
      aria-disabled={disabled}
      className={bem(
        'thumb',
        {
          dragging: dragging === index,
          focused: focused === index,
          disabled,
          [`index-${index}`]: true,
        },
        className,
      )}
      data-testid={shapeTestId(`thumb-${index}`)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      ref={ref}
      role='slider'
      style={{ left: `${position}%` }}
      tabIndex={disabled ? -1 : 0}
    >
      {showValue && <StyledThumbLabel className={bem('thumb-label')}>{valueText}</StyledThumbLabel>}
    </StyledThumb>
    // </Tooltip>
  )
}

export default SliderThumb

const StyledThumb = styled.div`
  position: absolute;
  border-radius: 50%;
  box-shadow: $slider-box-shadow;
  // @include theme-prop(background, var(--color-gradient-light-blue));
  // background: var(--color-gradient-light-blue);
  -webkit-tap-highlight-color: transparent;
  transform: translate(-50%, -50%);
  transition: transform var(--motion-productive-long) var(--motion-timing-enter);
  &--dragging {
    cursor: grabbing !important;
  }
  &--focused {
    cursor: grab;
  }

  background-color: #7af94b;
  height: 16px;
  width: 16px;

  &:hover {
    cursor: grab;
  }
`
const StyledThumbLabel = styled.label`
  bottom: calc(100% + 8px);
  left: 50%;
  max-width: 50px;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  transform: translate(-50%, 0);
  white-space: nowrap;
`
