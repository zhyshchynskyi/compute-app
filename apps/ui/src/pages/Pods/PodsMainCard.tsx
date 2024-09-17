import styled, { css } from 'styled-components'

import Button from 'share-ui/components/Button/Button'

import Delete from 'share-ui/components/Icon/Icons/components/Delete'
import Edit from 'share-ui/components/Icon/Icons/components/Edit'
import MoveArrowRight from 'share-ui/components/Icon/Icons/components/MoveArrowRight'
import EyeOpen from 'share-ui/components/Icon/Icons/components/EyeOpen'

import Heading from 'share-ui/components/Heading/Heading'

import TypographySecondary from 'components/Typography/Secondary'
import TypographyPrimary from 'components/Typography/Primary'
import HeadingSecondary from 'components/Heading/Secondary'

import { textSlicer } from 'utils/textSlicer'

import { ButtonPrimary } from 'components/Button/Button'
import ProgressBar from './ProsgressBar'
import { StyledStatusTypography } from './cards/PodListCard'

type PodsMainCardProps = {
  name: string
  description: string
  teamAgents: any[]
  onViewClick?: () => void
  creator?: any
  avatar?: string
  teamType?: string
  running?: boolean
  price: string
  uptime: string
  cpu: { utl: number; mem: number }
  gpu: { utl: number; mem: number }
}

const PodsMainCard = ({
  name,
  description,
  onViewClick,
  uptime,
  price,
  running = true,
  cpu,
  gpu,
}: PodsMainCardProps) => {
  const { shortText: shortDescription } = textSlicer(description, 120)

  return (
    <StyledCard>
      <StyledMainAvatarWrapper>
        <HeadingSecondary type={Heading.types?.h1} value={name} size='xss' />

        <StyledStatusTypography running={running} fontSize={'13px'} fontWeight={500}>
          {running ? 'Running' : 'Stopped'}
        </StyledStatusTypography>
      </StyledMainAvatarWrapper>
      <StyledBody>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TypographySecondary value={shortDescription} size='small' />
          <TypographySecondary value={'20 GB Disk 20 GB Pod Volume'} size='small' />
        </div>

        <div style={{ marginBottom: 'auto' }}>
          <StyledRowWrapper>
            <StyledRow>
              <TypographySecondary value={'CPU'} size='xs-small' />
              <ProgressBar value={cpu.utl} />
            </StyledRow>
            <StyledRow>
              <TypographySecondary value={'Mem'} size='xs-small' />
              <ProgressBar value={cpu.mem} />
            </StyledRow>
          </StyledRowWrapper>

          <StyledRowWrapper>
            <StyledRow>
              <TypographySecondary value={'GPU utilization'} size='xs-small' />
              <ProgressBar value={gpu.utl} />
            </StyledRow>
            <StyledRow>
              <TypographySecondary value={'GPU memory'} size='xs-small' />
              <ProgressBar value={gpu.mem} />
            </StyledRow>
          </StyledRowWrapper>
        </div>
        <TypographySecondary value={`Pod Uptime: ${uptime}`} size='small' />
      </StyledBody>
      <StyledCardFooter>
        <StyledPriceWrapper>
          <TypographyPrimary value={price} size='medium' />
        </StyledPriceWrapper>
        <StyledButtonsWrapper>
          {onViewClick && (
            <StyledChatButtonWrapper>
              <ButtonPrimary size={Button.sizes?.SMALL} onClick={onViewClick}>
                Details
                <MoveArrowRight size={14} />
              </ButtonPrimary>
            </StyledChatButtonWrapper>
          )}
        </StyledButtonsWrapper>
      </StyledCardFooter>
    </StyledCard>
  )
}

export default PodsMainCard

const StyledCard = styled.div`
  position: relative;
  width: 335px;
  min-width: 335px;
  height: 330px;
  min-height: 330px;

  padding: 20px 25px;
  /* padding-top: 30px; */

  border-radius: 22px;
  border: 1px solid transparent;
  box-shadow: ${({ theme }) => theme.body.boxShadow};

  background: ${({ theme }) => theme.body.cardBgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 5px;

  :hover {
    .footerButtons {
      opacity: 1;
    }
  }
`

const StyledCardFooter = styled.div`
  margin-top: auto;
  width: 100%;
  padding-top: 15px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  gap: 4px;
  width: 100%;
`
const StyledMainAvatarWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const StyledInnerButtonWrapper = styled.div<{ secondary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;
  padding: 10px 18px;

  ${p =>
    p.secondary &&
    css`
      padding: 5px;
    `};
`

const StyledRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* gap: 5px; */
  /* margin-top: auto; */
  width: 100%;
  gap: 5px;

  margin-top: 10px;
`
const StyledBody = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  height: 100%;
  width: 100%;
  gap: 20px;
`

export const StyledChatButtonWrapper = styled.div`
  margin-left: auto;
`

export const StyledEyeOpenIcon = styled(EyeOpen)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledDeleteIcon = styled(Delete)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledEditIcon = styled(Edit)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
  gap: 2px;
`

const StyledPriceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #0000002d;

  border-radius: 6px;

  padding: 6px 4px;

  width: 100px;

  font-family: 600;
`
