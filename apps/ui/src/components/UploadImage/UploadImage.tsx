import Box from '@mui/material/Box'
import FIleUploadButton from 'components/FIleUploadButton'
import { StyledDeleteIcon } from 'pages/Pods/PodsMainCard'
import IconButton from 'share-ui/components/IconButton/IconButton'
import Loader from 'share-ui/components/Loader/Loader'
import styled from 'styled-components'

type UploadImageProps = {
  loading: boolean
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  remove: () => void
  hideRemove: boolean
  buttonLabel: string
}

const UploadImage = ({
  loading,
  value,
  onChange,
  remove,
  hideRemove,
  buttonLabel,
}: UploadImageProps) => {
  return (
    <Box width={'100%'} display={'flex'} alignItems={'center'} gap={2}>
      <Box display={'flex'} alignItems={'center'} gap={0.5}>
        <StyledImageWrapper>
          <StyledImg src={value} isLoading={loading} />
          {loading && (
            <StyledLoaderWrapper>
              <Loader />
            </StyledLoaderWrapper>
          )}
        </StyledImageWrapper>

        {hideRemove && (
          <IconButton
            onClick={remove}
            icon={() => <StyledDeleteIcon />}
            size={IconButton.sizes?.SMALL}
            kind={IconButton.kinds?.TERTIARY}
            ariaLabel='Remove'
          />
        )}
      </Box>
      <div>
        <FIleUploadButton label={buttonLabel} onChange={onChange} />
      </div>
    </Box>
  )
}

export default UploadImage

const StyledImg = styled.img<{ isLoading?: boolean }>`
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 8px;
  filter: ${({ isLoading }) => (isLoading ? 'brightness(50%)' : 'none')};
`
const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`
const StyledLoaderWrapper = styled.div`
  position: absolute;
`
