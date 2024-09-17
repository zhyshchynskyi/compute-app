import Button from 'share-ui/components/Button/Button'
import { useTranslation } from 'react-i18next'
import { ButtonTertiary } from 'components/Button/Button'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

type BackButtonProps = {
  customOnClick?: () => void
}

const BackButton = ({ customOnClick }: BackButtonProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const ClickHandler = () => {
    if (customOnClick) {
      customOnClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <StyledButton onClick={ClickHandler} size={Button.sizes?.MEDIUM}>
      {t('back')}
    </StyledButton>
  )
}

export default BackButton

const StyledButton = styled(ButtonTertiary)`
  margin: 0 4px;
`
