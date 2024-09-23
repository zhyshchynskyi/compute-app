import TypographySecondary from 'components/Typography/Secondary'
import { useEffect, useRef, useState } from 'react'

import styled, { css } from 'styled-components'

type TableCellProps = {
  cell: any
  noBorder?: boolean
}

const TableCell = ({ cell, noBorder }: TableCellProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const tableCellRef = useRef<HTMLTableCellElement>(null)
  const multiselectEditorRef = useRef<any>()

  const { column, row, value: cellValue } = cell
  const { original: data } = row
  const { isEdit, cellEditor: Editor, cellEditorParams, valueSetter, maxWidth, minWidth, width } = column

  let handleEditMode = null

  if (isEdit) {
    handleEditMode = () => {
      setIsEditing(true)
    }
  }

  const getMultiselectEditorValues = () => {
    // Access the values through the ref
    const values = multiselectEditorRef.current?.getValue()

    if (values === undefined) return

    valueSetter({ newValue: values, data: data })
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditing && event.key === 'Enter') {
        getMultiselectEditorValues()
        setIsEditing(false)
        // Add your logic here to handle the Enter key press
      }
      if (isEditing && event.key === 'Escape') {
        // Do whatever when Esc is pressed
        setIsEditing(false)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (tableCellRef.current && !tableCellRef.current.contains(event.target as Node)) {
        // Clicked outside the component, close editing mode

        getMultiselectEditorValues()

        setIsEditing(false)
      }
    }

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing])

  return (
    <StyledTd
      ref={tableCellRef}
      {...cell.getCellProps()}
      onClick={handleEditMode}
      maxWidth={maxWidth}
      minWidth={minWidth}
      width={width}
      isEditing={isEditing}
      cursorPointer={isEdit}
      noBorder={noBorder}
    >
      {isEditing ? (
        <StyledWrapper>
          <Editor {...cellEditorParams} value={cellValue} ref={multiselectEditorRef} />
        </StyledWrapper>
      ) : (
        <StyledTypographyWrapper>
          <TypographySecondary value={cell.render('Cell')} size='small' />
        </StyledTypographyWrapper>
      )}
    </StyledTd>
  )
}

export default TableCell

const StyledTd = styled.div<{ isEditing: boolean; cursorPointer: boolean; noBorder: boolean }>`
  padding: 5px 10px;
  position: relative;

  display: flex;
  /* align-items: center; */

  overflow: hidden;

  border-right: ${({ theme }) => theme.body.secondaryBorder};
  border-bottom: ${({ theme }) => theme.body.secondaryBorder};

  :hover {
    background-color: ${({ theme }) => theme.body.detailCardBackgroundColor};
  }

  ${p =>
    p.isEditing &&
    css`
      padding: 0;
      overflow: visible;
    `};
  ${p =>
    p.cursorPointer &&
    css`
      cursor: pointer;
    `};
  ${p =>
    p.noBorder &&
    css`
      :hover {
        background-color: unset;
      }
      border-right: unset;
    `};
`
const StyledWrapper = styled.div`
  border: 1px solid #000;
  border-radius: 5px;

  width: 100%;
`

const StyledTypographyWrapper = styled.div`
  display: inline;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`
