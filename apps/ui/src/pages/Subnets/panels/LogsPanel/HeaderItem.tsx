import { useState, useRef } from 'react'
import styled from 'styled-components'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'

interface DataType {
  [key: string]: string | number
}

const HeaderItem = ({ data }: { data: DataType }) => {
  const [showAll, setShowAll] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  const handleShowMore = () => {
    setShowAll(!showAll)
    if (showAll && topRef.current) {
      setTimeout(() => {
        topRef.current?.scrollIntoView({ behavior: 'instant', block: 'center' })
      }, 1)
    }
  }

  const headersToShow = showAll ? Object.entries(data) : Object.entries(data).slice(0, 2)

  return (
    <>
      <div ref={topRef}></div>
      {headersToShow.map(([key, value]) => (
        <StyledInfoValue key={key}>
          <TypographySecondary size='small' value={key} />
          <TypographyPrimary size='small' value={String(value)} semiBold />
        </StyledInfoValue>
      ))}

      {Object.entries(data).length > 2 && (
        <StyledShowMoreButton onClick={handleShowMore}>
          {showAll ? 'Show less' : 'Show more'}
        </StyledShowMoreButton>
      )}
    </>
  )
}

export default HeaderItem

export const StyledInfoValue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  max-width: 500px;
  word-wrap: break-word;
  overflow-wrap: break-word;

  word-wrap: break-word;
  overflow-wrap: break-word;
`

const StyledShowMoreButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.body.textColorPrimary};

  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  font-size: 14px;
  margin-top: 10px;
`
