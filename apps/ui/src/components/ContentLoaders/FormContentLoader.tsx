import ContentLoader from 'react-content-loader'
import styled, { useTheme } from 'styled-components'

const FormContentLoader = () => {
  const theme = useTheme()

  return (
    <StyledWrapper>
      <ContentLoader
        viewBox='0 0 400 160'
        backgroundColor={theme?.contentLoader.bgColor}
        foregroundColor={theme?.contentLoader.fgColor}
      >
        {/* Simulating form fields */}
        <rect x='0' y='0' rx='5' ry='5' width='100%' height='15' />
        <rect x='0' y='20' rx='5' ry='5' width='100%' height='15' />
        <rect x='0' y='40' rx='5' ry='5' width='100%' height='40' />
        <rect x='0' y='90' rx='5' ry='5' width='50%' height='15' />
        <rect x='0' y='110' rx='5' ry='5' width='25%' height='15' />
      </ContentLoader>
    </StyledWrapper>
  )
}

export default FormContentLoader

const StyledWrapper = styled.div`
  width: 100%;
  padding-right: 10px;
  margin-top: 40px;
`
