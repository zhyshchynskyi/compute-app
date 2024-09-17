import { SDK_DATA } from './constants'
import { useState } from 'react'
import styled from 'styled-components'

import TypographyPrimary from 'components/Typography/Primary'

import { StyledInnerFormWrapper } from './SubnetsStyles'
import ComingSoonContainer from 'components/ComingSoonContainer'

const SDKs = () => {
  const [pickedData, setPickedData] = useState(SDK_DATA[0])

  return (
    <>
      <StyledRoot>
        <StyledInnerFormWrapper style={{ width: '35%' }}>
          <StyledCardsWrapper>
            {SDK_DATA.map(data => {
              return (
                <StyledCard
                  picked={data === pickedData}
                  key={data.name}
                  onClick={() => setPickedData(data)}
                >
                  <StyledImg src={data.logo} />

                  <TypographyPrimary
                    style={{ fontWeight: 500 }}
                    value={data.name}
                    size={'medium'}
                  />
                </StyledCard>
              )
            })}
          </StyledCardsWrapper>
        </StyledInnerFormWrapper>

        <StyledInnerFormWrapper
          style={{
            width: '65%',
          }}
        >
          {/* <ComingSoonContainer isDisabled={false}>
            <AiMessageMarkdown>{pickedData.code}</AiMessageMarkdown>
          </ComingSoonContainer> */}
        </StyledInnerFormWrapper>
      </StyledRoot>
    </>
  )
}

export default SDKs

const StyledCard = styled.div<{ picked: boolean }>`
  width: 150px;
  height: 100px;

  border-radius: 10px;
  border: ${({ theme }) => `1px solid ${theme.core.border.borderQuaternary}`};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-shadow: ${({ picked, theme }) => (picked ? `${theme.body.boxShadow}` : 'none')};

  &:hover {
    box-shadow: ${({ theme }) => `${theme.body.boxShadow}`};
  }

  cursor: pointer;
`
const StyledCardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`
const StyledImg = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`
const StyledRoot = styled.div`
  width: 100%;
  height: 100%;

  background: ${({ theme }) => theme.body.cardBgColor};

  padding: 10px;

  border-radius: 22px;

  padding: 20px;

  display: flex;
  flex-direction: row;
  gap: 16px;

  margin-bottom: 10px;
`
