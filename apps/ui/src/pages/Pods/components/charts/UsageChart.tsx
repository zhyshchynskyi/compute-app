import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
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
import { getLastNDays } from './helpers'
import { TEMP_DATA } from './constants'

const UsageChart = () => {
  const EMPTY_TEMP_DATA = getLastNDays(15).map(date => ({
    expenses: {
      storage: 0,
      pods: 0,
      datura: 0,
      serverless: 0,
    },
    date,
    total: 0,
  }))

  return (
    <StyledChartWrapper>
      <StyledChartHeader>
        <StyledColumn>
          <TypographySecondary value='Rolling Average' size='xs-small' />
          <TypographyPrimary value='$0.00/day' size='medium' semiBold />
        </StyledColumn>

        <StyledColumn>
          <TypographySecondary value='Current Spend Rate' size='xs-small' />
          <TypographyPrimary value='$0.00/hr' size='medium' semiBold />
        </StyledColumn>
      </StyledChartHeader>

      <ResponsiveContainer width='100%' height={300}>
        <BarChart
          data={TEMP_DATA?.length === 0 ? EMPTY_TEMP_DATA : TEMP_DATA}
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
          <Bar dataKey='expenses.storage' stackId='a' fill='#17C568' name='Storage' />
          <Bar dataKey='expenses.pods' stackId='a' fill='#1B9DFE' name='Pods' />
          <Bar dataKey='expenses.datura' stackId='a' fill='#EEA03C' name='Datura Endpoints' />
          <Bar dataKey='expenses.serverless' stackId='a' fill='#8251CC' name='Serverless' />
        </BarChart>
      </ResponsiveContainer>
    </StyledChartWrapper>
  )
}

export default UsageChart

const StyledChartWrapper = styled.div`
  width: 100%;
  height: 100%;

  padding: 0 100px;

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
