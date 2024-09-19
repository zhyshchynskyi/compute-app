import ContentLoader from 'react-content-loader'
import styled, { useTheme } from 'styled-components'

const TemplateCardLoader = () => {
  const theme = useTheme()
  return (
    <StyledRootBox>
      <StyledCardLayoutBox>
        <ContentLoader
          height={100}
          width='100%'
          viewBox='0 0 400 100'
          backgroundColor={theme?.contentLoader.bgColor}
          foregroundColor={theme?.contentLoader.fgColor}
        >
          <rect x='10' y='10' rx='5' ry='5' width='60' height='60' />

          <rect x='80' y='10' rx='5' ry='5' width='200' height='20' />
          <rect x='80' y='40' rx='5' ry='5' width='50' height='15' />
          <rect x='140' y='40' rx='5' ry='5' width='50' height='15' />

          <rect x='80' y='70' rx='5' ry='5' width='150' height='15' />
        </ContentLoader>
      </StyledCardLayoutBox>
    </StyledRootBox>
  )
}

export default TemplateCardLoader

const StyledRootBox = styled.div`
  display: flex;
  margin-top: 8px;

  border: ${({ theme }) => `1px solid ${theme.contentLoader.borderColor}`};

  border-radius: 8px;

  background-color: ${({ theme }) => theme.contentLoader.mainBgColor};
`

const StyledCardLayoutBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
