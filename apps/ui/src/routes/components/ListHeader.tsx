import styled from 'styled-components'

import IconButton from 'share-ui/components/IconButton/IconButton'

import { StyledAddIcon } from 'pages/Navigation/MainNavigation'

import { ButtonTertiary } from 'components/Button/Button'
import MenuButton from 'share-ui/components/MenuButton/MenuButton'
import { TypographySizes, TypographyTypes } from 'share-ui/components/typography/TypographyConstants'
import TypographyPrimary from 'components/Typography/Primary'

type ListHeaderProps = {
  title: string
  onAddClick?: () => void
  multiOption?: { label: string; function: () => void }[]
  customLabel?: string
}

const ListHeader = ({ title, customLabel, onAddClick, multiOption }: ListHeaderProps) => {
  return (
    <StyledListHeader>
      <TypographyPrimary value={`${title}`} type={TypographyTypes.LABEL} size={TypographySizes.md} />
      {onAddClick && (
        <IconButton
          icon={() => <StyledAddIcon size={30} />}
          onClick={onAddClick}
          size={IconButton.sizes?.SMALL}
          kind={IconButton.kinds?.TERTIARY}
          ariaLabel={customLabel || `Add ${title}`}
        />
      )}

      {multiOption && (
        <MenuButton component={() => <StyledAddIcon size={30} />} closeDialogOnContentClick ariaLabel={`Add ${title}`}>
          <StyledMenuButtonsWrapper>
            {multiOption.map((item: any, index: number) => {
              return (
                <ButtonTertiary
                  key={index}
                  onClick={item.function}
                  size={IconButton.sizes?.SMALL}
                  ariaLabel={`Add ${title}`}
                >
                  {item.label}
                </ButtonTertiary>
              )
            })}
          </StyledMenuButtonsWrapper>
        </MenuButton>
      )}
    </StyledListHeader>
  )
}

export default ListHeader

export const StyledMenuButtonsWrapper = styled.div`
  background: ${({ theme }) => theme.body.backgroundColorSecondary};
  border: ${({ theme }) => theme.body.secondaryBorder};
  backdrop-filter: blur(100px);
  padding: 10px;
  border-radius: 10px;

  min-width: fit-content;

  display: flex;
  flex-direction: column;
  gap: 5px;
`

const StyledListHeader = styled.div`
  display: flex;
  align-items: center;

  justify-content: space-between;
  width: 100%;
  font-weight: 700;
  min-height: 30px;
`
