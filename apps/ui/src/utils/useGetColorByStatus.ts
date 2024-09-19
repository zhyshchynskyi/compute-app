import { useTheme } from 'styled-components'

export const useGetColorByStatus = () => {
  const theme = useTheme()

  const getColorByStatus = (status: string) => {
    const statusCode = parseInt(status, 10)
    if (statusCode >= 200 && statusCode < 300) {
      return theme?.coreExtensions.tags.tagsGreen
    } else if (statusCode >= 300 && statusCode < 400) {
      return theme?.coreExtensions.tags.tagsBlue
    } else if (statusCode >= 400 && statusCode < 500) {
      return theme?.coreExtensions.tags.tagsOrange
    } else if (statusCode >= 500) {
      return theme?.coreExtensions.tags.tagsRed
    } else {
      return theme?.body.textColorPrimary
    }
  }

  return { getColorByStatus }
}
