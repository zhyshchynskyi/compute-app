import ContentLoader from 'react-content-loader'

const BasicContentLoader = ({ ...rest }) => (
  <ContentLoader
    height='500'
    width='100%'
    viewBox='0 0 100% 500'
    backgroundColor='#d1d1d1'
    foregroundColor='#c0c0c0'
    {...rest}
  >
    <rect x='0' y='0' rx='5' ry='5' width='100%' height='50' />
    <rect x='0' y='70' rx='5' ry='5' width='100%' height='200' />
    <rect x='0' y='280' rx='5' ry='5' width='70%' height='50' />
    <rect x='0' y='340' rx='5' ry='5' width='25%' height='50' />
  </ContentLoader>
)

export default BasicContentLoader
