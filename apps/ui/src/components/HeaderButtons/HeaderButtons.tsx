import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'

import Tooltip from 'share-ui/components/Tooltip/Tooltip'

import { ButtonTertiary } from 'components/Button/Button'

import Hide from 'share-ui/components/Icon/Icons/components/Hide'
import Show from 'share-ui/components/Icon/Icons/components/Show'
import { useContext } from 'react'
import { LayoutContext } from 'contexts'
import { useLocation } from 'react-router-dom'
import { isMacOS } from 'utils/isMac'

export const openLinkTab = (url: string) => {
  window.open(url, '_blank')
}

const HeaderButtons = () => {
  const { t } = useTranslation()
  const { expand, onChangeLayout } = useContext(LayoutContext)
  const location = useLocation()

  return (
    <StyledButtonsWrapper>
      {location.pathname.includes('/chat') && (
        <Tooltip
          content={
            <span>
              {t('focus')} {isMacOS ? `${t('ctrl+f')}` : `${t('ctrl+shift+f')}`}
            </span>
          }
          position={Tooltip?.positions?.BOTTOM}
          tooltipSize={Tooltip?.tooltipSize?.Small}
        >
          <ButtonTertiary size={'small'} onClick={() => onChangeLayout(!expand)}>
            {expand ? <Show size={26} /> : <Hide size={26} />}
          </ButtonTertiary>
        </Tooltip>
      )}
    </StyledButtonsWrapper>
  )
}

export default HeaderButtons

const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 5px;
`
export const StyledImg = styled.img<{ customScale?: number }>`
  width: 16px;
  height: 16px;
  object-fit: cover;
  transform: scale(1.4);

  ${p =>
    p.customScale &&
    css`
      transform: scale(${p.customScale});
    `};
`
export const StyledImageWrapper = styled.div<{ secondary?: boolean }>`
  max-width: 20px;
  max-height: 20px;
  border-radius: 100px;
  border: 1px solid transparent;
  overflow: hidden;

  margin-bottom: 2px;

  ${p =>
    p.secondary &&
    css`
      border: 1px solid #fff;
    `};
`
export const StyledInnerButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`
