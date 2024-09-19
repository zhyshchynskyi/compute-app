import ContentLoader from 'react-content-loader'
import styled, { useTheme } from 'styled-components'

const PodCardLoader = () => {
  const theme = useTheme()
  return (
    <StyledRootBox>
      <StyledCardLayoutBox>
        <ContentLoader
          height={50}
          width='100%'
          viewBox='0 0 400 50'
          backgroundColor={theme?.contentLoader.bgColor}
          foregroundColor={theme?.contentLoader.fgColor}
        >
          {/* Name */}
          <rect x='10' y='10' rx='5' ry='5' width='200' height='15' />

          {/* Template Image */}
          <rect x='10' y='30' rx='5' ry='5' width='150' height='10' />

          {/* Resource */}
          <rect x='170' y='30' rx='5' ry='5' width='100' height='10' />

          {/* Status */}
          <rect x='300' y='10' rx='5' ry='5' width='80' height='30' />
        </ContentLoader>
      </StyledCardLayoutBox>
    </StyledRootBox>
  )
}

export default PodCardLoader

const StyledRootBox = styled.div`
  width: 100%;
  margin-top: 8px;
  border: ${({ theme }) => `1px solid ${theme.contentLoader.borderColor}`};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.contentLoader.mainBgColor};
`

const StyledCardLayoutBox = styled.div`
  padding: 10px 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`
