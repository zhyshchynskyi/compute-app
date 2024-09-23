import ContentLoader from 'react-content-loader'
import styled, { useTheme } from 'styled-components'

const ColumnListContentLoader = () => {
  const theme = useTheme()

  return (
    <StyledWrapper>
      <ContentLoader
        viewBox='0 0 450 160'
        backgroundColor={theme?.contentLoader.bgColor}
        foregroundColor={theme?.contentLoader.fgColor}
      >
        <rect x='10' y='10' rx='5' ry='5' width='50' height='50' />
        <rect x='75' y='10' rx='5' ry='5' width='300' height='20' />
        <rect x='75' y='40' rx='5' ry='5' width='100' height='15' />
      </ContentLoader>
    </StyledWrapper>
  )
}

export default ColumnListContentLoader

const StyledWrapper = styled.div`
  width: 100%;
  padding-right: 10px;

  height: 40px;
`
