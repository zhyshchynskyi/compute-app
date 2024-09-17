import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import { getLastNDays } from 'pages/Pods/components/charts/helpers'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    //   CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import styled from 'styled-components'

const SubnetChart = ({
    data,
    label,
    secondary,
}: {
    data: { date: string; total: number }[]
    label: string
    secondary?: boolean
}) => {
    const EMPTY_TEMP_DATA = getLastNDays(15).map(date => ({
        date,
        total: 0,
    }))
    const calculateTotalSum = () => {
        const currentData = data?.length === 0 ? EMPTY_TEMP_DATA : data

        const sum = currentData.reduce((acc, curr) => acc + curr.total, 0)
        return parseFloat(sum.toFixed(2)) // Convert to string with 2 decimal places, then back to number
    }

    return (
        <StyledChartWrapper>
            <StyledChartHeader>
                <StyledColumn>
                    <TypographySecondary value={label} size='xs-small' />
                    <TypographyPrimary value={`$${calculateTotalSum()}`} size='medium' semiBold />
                </StyledColumn>
            </StyledChartHeader>

            <ResponsiveContainer width='100%' height={300}>
                <BarChart
                    data={data?.length === 0 ? EMPTY_TEMP_DATA : data}
                    margin={{ top: 5, right: 20, bottom: 5, left: 5 }}
                >
                    {/* <CartesianGrid /> */}
                    <XAxis dataKey='date' tick={{ fontSize: 11 }} stroke='#868686' />
                    <YAxis
                        tickFormatter={value => `$${value.toFixed(2)}`}
                        tick={{ fontSize: 11 }}
                        stroke='#868686'
                    />
                    <Tooltip
                        formatter={value => `$${Number(value).toFixed(2)}`}
                        wrapperStyle={{
                            outline: 'none',
                            border: 'none',
                            borderRadius: '8px',
                            overflow: 'hidden',
                        }}
                    />
                    <Legend />
                    {/* <Bar dataKey='expenses.storage' stackId='a' fill='#17C568' name='Storage' /> */}
                    <Bar
                        dataKey='total'
                        stackId='a'
                        fill={secondary ? '#17C568' : '#1B9DFE'}
                        name='Total'
                    />
                    {/* <Bar dataKey='expenses.datura' stackId='a' fill='#EEA03C' name='Datura Endpoints' />
          <Bar dataKey='expenses.serverless' stackId='a' fill='#8251CC' name='Serverless' /> */}
                </BarChart>
            </ResponsiveContainer>
        </StyledChartWrapper>
    )
}

export default SubnetChart

const StyledChartWrapper = styled.div`
    width: 100%;
    height: 100%;

    /* scale: 0.9; */

    display: flex;
    flex-direction: column;

    gap: 30px;
`
const StyledChartHeader = styled.div`
    display: flex;
    align-items: center;

    gap: 50px;

    margin-left: 20px;
`
const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`
