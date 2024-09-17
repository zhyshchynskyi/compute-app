import { StyledTableWrapper } from 'pages/Billing/panels/Transactions'
import Table from 'components/Table'
import { METHOD_OPTIONS, STATUS_OPTIONS } from './constants'
import { columns } from './columnConfig'
import LogDetails from './LogDetails'
import TextField from 'share-ui/components/TextField/TextField'
import styled from 'styled-components'
import Dropdown from 'share-ui/components/Dropdown/Dropdown'
import TypographyPrimary from 'components/Typography/Primary'
import useApiLog, { MethodEnum } from './useApiLog'
import { ButtonTertiary } from 'components/Button/Button'

const LogsPanel = ({ showFilters = false }: { showFilters?: boolean }) => {
    const {
        logs,
        filter,
        handleFilterChange,
        handleClearFilter,
        fetch_logs_loading,
        total_pages,
        setPage,
    } = useApiLog()

    return (
        <StyledTableWrapper>
            <StyledRoot>
                <Table
                    columns={columns()}
                    data={logs}
                    hiddenContentAccessor={row => {
                        return <LogDetails data={row?.additional_data as any} />
                    }}
                    noBorder
                    isLoading={fetch_logs_loading}
                    page={filter.page}
                    totalPages={total_pages}
                    setPage={setPage}
                />

                {showFilters && (
                    <StyledFilterWrapper>
                        <TextField
                            title='Start Date'
                            type={TextField?.types?.DATE}
                            value={filter.start_date}
                            onChange={value => handleFilterChange('start_date', value)}
                        />
                        <TextField
                            title='End Date'
                            type={TextField?.types?.DATE}
                            value={filter.end_date}
                            onChange={value => handleFilterChange('end_date', value)}
                        />

                        <div>
                            <TypographyPrimary value='Method' size='medium' />
                            <Dropdown
                                options={METHOD_OPTIONS}
                                value={{ label: filter.method, value: filter.method }}
                                onChange={(value: { label: string; value: MethodEnum }) =>
                                    handleFilterChange('method', value?.value)
                                }
                            />
                        </div>

                        <div>
                            <TypographyPrimary value='Status Code' size='medium' />
                            <Dropdown
                                value={{ label: filter.status_code, value: filter.status_code }}
                                onChange={(value: { label: string; value: string }) =>
                                    handleFilterChange('status_code', value?.value)
                                }
                                options={STATUS_OPTIONS}
                            />
                        </div>

                        <ButtonTertiary onClick={handleClearFilter}>Clear filter</ButtonTertiary>
                    </StyledFilterWrapper>
                )}
            </StyledRoot>
        </StyledTableWrapper>
    )
}

export default LogsPanel

const StyledRoot = styled.div`
    display: flex;

    width: 100%;
    height: 100%;

    gap: 20px;
`

const StyledFilterWrapper = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;

    max-width: 300px;

    gap: 10px;
`
