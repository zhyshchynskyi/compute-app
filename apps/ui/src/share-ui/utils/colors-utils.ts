import { COLOR_STYLES, contentColors } from './colors-vars-map'

const ColorUtils = {
  modes: COLOR_STYLES,
  contentColors,
  getL3velsColorAsStyle: (color: string, mode = COLOR_STYLES.REGULAR, withVar = true) => {
    return `${withVar ? 'var(' : ''}--color-${color}${mode !== COLOR_STYLES.REGULAR ? `-${mode}` : ''}${
      withVar ? ')' : ''
    }`
  },
}

export default Object.freeze(ColorUtils)
