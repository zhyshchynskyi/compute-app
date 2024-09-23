import { useEffect, useMemo, useState } from 'react'

import { useTable, useResizeColumns, useFlexLayout, Cell, HeaderProps, HeaderGroup } from 'react-table'

import styled from 'styled-components'
import TableCell from './components/TableCell'

import TypographyPrimary from 'components/Typography/Primary'

import Loader from 'share-ui/components/Loader/Loader'

import {
  PageNumber,
  PaginationWrapper,
  StyledLoaderWrapper,
  StyledNavigationChevronLeft,
  StyledNavigationChevronRight,
  StyledRoot,
  StyledTable,
  StyledTbody,
  StyledTh,
  StyledThead,
  StyledTr,
} from './TableStyles'

type DataRow = Record<string, unknown>

type ColumnProps = {
  Header: string | ((props: HeaderProps<DataRow>) => React.ReactNode)
  accessor: string
  isEdit?: boolean
  cellEditor?: React.ComponentType<unknown>
  cellEditorParams?: Record<string, unknown>
  valueSetter?: (value: unknown) => void
  maxWidth?: number
}

type TableProps = {
  columns: ColumnProps[]
  data: DataRow[]
  pagination?: boolean
  page?: number
  setPage?: (value: number) => void
  isLoading?: boolean
  totalPages?: number | null
  selectedRow?: string | null
  hiddenContentAccessor?: (row: Record<string, unknown>) => React.ReactNode
  noBorder?: boolean
}

const Table = ({
  columns,
  data,
  page = 1,
  setPage,
  totalPages = null,
  isLoading,
  selectedRow,
  hiddenContentAccessor, // Destructure hiddenContentAccessor
  noBorder,
}: TableProps) => {
  const [totalPageState, setTotalPageState] = useState(totalPages)
  const [selectedRowState, setSelectedRowState] = useState<string | null>(null)
  const [openedRowIndices, setOpenedRowIndices] = useState<number[]>([]) // State for opened rows

  useEffect(() => {
    if (selectedRow) return setSelectedRowState(selectedRow)
    else return setSelectedRowState(null)
  }, [selectedRow])

  useEffect(() => {
    if (totalPageState === totalPages) return

    setTotalPageState(totalPages)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages])

  const defaultColumn = useMemo(
    () => ({
      // width: 300,
    }),
    [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      defaultColumn,
      columns,
      data,
    },
    // useBlockLayout,
    useResizeColumns,
    useFlexLayout,
  )

  const paginate = (pageNumber: number) => {
    if (setPage) setPage(pageNumber)
  }

  const handleNextPage = () => {
    if (totalPages && setPage && page < totalPages) {
      setPage(page + 1)
    }
  }

  const handlePrevPage = () => {
    if (setPage && page > 1) {
      setPage(page - 1)
    }
  }

  const toggleRow = (index: number) => {
    setOpenedRowIndices(prev => (prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]))
  }

  return (
    <StyledRoot>
      {isLoading && (
        <StyledLoaderWrapper>
          <Loader size={50} />
        </StyledLoaderWrapper>
      )}
      <StyledTable {...getTableProps()}>
        <StyledThead>
          {headerGroups.map((headerGroup: HeaderGroup<DataRow>, index: number) => (
            <StyledTr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column: any, index: number) => {
                return (
                  <StyledTh {...column.getHeaderProps()} key={index}>
                    <TypographyPrimary value={column.render('Header')} size='small' />
                    <div
                      {...column.getResizerProps()}
                      style={{
                        width: '10px',
                        height: '100%',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        cursor: 'col-resize',
                      }}
                    />
                  </StyledTh>
                )
              })}
            </StyledTr>
          ))}
        </StyledThead>
        <StyledTbody {...getTableBodyProps()}>
          {rows?.map((row: any, index: number) => {
            prepareRow(row)

            const hasHiddenContent = hiddenContentAccessor && hiddenContentAccessor(row.original)

            return (
              <>
                <StyledTr
                  {...row.getRowProps()}
                  key={index}
                  bodyRow
                  isSelected={
                    row.original.id === selectedRowState || (openedRowIndices.includes(index) && hiddenContentAccessor)
                  }
                  onClick={() => toggleRow(index)} // Toggle row on click
                  hasHiddenContent={hasHiddenContent}
                >
                  {row.cells.map((cell: Cell<Record<string, unknown>>, index: number) => {
                    return <TableCell key={index} cell={cell} noBorder={noBorder} />
                  })}
                </StyledTr>
                {openedRowIndices.includes(index) &&
                  hiddenContentAccessor && ( // Conditionally render hidden content
                    <StyledHiddenContent>{hiddenContentAccessor(row.original)}</StyledHiddenContent>
                  )}
              </>
            )
          })}
        </StyledTbody>
      </StyledTable>
      {totalPageState && (
        <PaginationWrapper>
          <PageNumber onClick={handlePrevPage}>
            <StyledNavigationChevronLeft size={16} />
          </PageNumber>
          <PageNumber onClick={() => paginate(1)} active={1 === page}>
            1
          </PageNumber>
          {page > 2 && (
            <>
              {page > 4 && <PageNumber readOnly>...</PageNumber>}
              {page !== 3 && <PageNumber onClick={() => paginate(page - 2)}>{page - 2}</PageNumber>}
              <PageNumber onClick={() => paginate(page - 1)}>{page - 1}</PageNumber>
            </>
          )}
          {page !== 1 && (
            <PageNumber onClick={() => paginate(page)} active={true}>
              {page}
            </PageNumber>
          )}
          {page < totalPageState - 1 && (
            <>
              <PageNumber onClick={() => paginate(page + 1)}>{page + 1}</PageNumber>
              {page < totalPageState - 2 && <PageNumber onClick={() => paginate(page + 2)}>{page + 2}</PageNumber>}
              {page < totalPageState - 3 && <PageNumber readOnly>...</PageNumber>}
            </>
          )}
          {totalPageState > 1 && page !== totalPageState && (
            <PageNumber onClick={() => paginate(totalPageState)} active={totalPageState === page}>
              {totalPageState}
            </PageNumber>
          )}
          <PageNumber onClick={handleNextPage}>
            <StyledNavigationChevronRight size={16} />
          </PageNumber>
        </PaginationWrapper>
      )}
    </StyledRoot>
  )
}

export default Table

const StyledHiddenContent = styled.div`
  border-bottom: ${({ theme }) => theme.body.secondaryBorder};
`
