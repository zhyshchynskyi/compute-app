import ContentLoader from 'react-content-loader'
import styled from 'styled-components'

const CardContentLoader = () => {
  return (
    <StyledWrapper>
      <ContentLoader viewBox='0 0 400 150' backgroundColor='#d1d1d1' foregroundColor='#c0c0c0'>
        {/* Only SVG shapes */}
        <rect x='0' y='0' rx='5' ry='5' width='100%' height='100' />
        <rect x='0' y='110' rx='4' ry='4' width='75%' height='13' />
        <rect x='0' y='130' rx='3' ry='3' width='25%' height='10' />
      </ContentLoader>
    </StyledWrapper>
  )
}

export default CardContentLoader

const StyledWrapper = styled.div`
  width: 100%;
  padding-right: 10px;
`
