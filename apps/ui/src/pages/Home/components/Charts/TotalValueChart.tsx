import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import styled, { useTheme } from 'styled-components'
import { SubnetUsageTableProps } from '../SubnetUsageTable/SubnetUsageTable'

// const TEMP_DATA = [
//     { name: '18. Cortex.t', value: 5 },
//     { name: '20. BitAgent', value: 12 },
//     { name: '21. FileTAO', value: 20 },
//     { name: '22. Datura SmartScrape', value: 16 },
//     // ... more data items
// ]

const COLORS = ['#17C568', '#1B9DFE', '#EEA03C', '#8251CC']

const TotalValueChart = ({ data }: SubnetUsageTableProps) => {
  const theme = useTheme()

  const total = data.reduce((acc, entry) => acc + entry.total_usage, 0)

  const headers = data.map(item => ({
    name: item.subnet_name,
    value: item.total_usage ?? 0,
  }))

  return (
    <StyledChardWrapper>
      <PieChart width={200} height={200}>
        {data.length === 0 ? (
          <Pie
            data={[{ name: 'No usage', value: 1 }]}
            cx='50%'
            cy='50%'
            startAngle={90}
            endAngle={-270}
            innerRadius={60} // Decreased inner radius
            outerRadius={100}
            fill='#8884d8'
            stroke={theme?.body.secondaryBorderBackground}
            dataKey='value'
          >
            <Cell fill={theme?.body.secondaryBorderBackground} />
          </Pie>
        ) : (
          <>
            <Pie
              data={headers}
              cx='50%'
              cy='50%'
              startAngle={90}
              endAngle={-270}
              innerRadius={60} // Decreased inner radius
              outerRadius={100}
              fill='#8884d8'
              stroke={theme?.body.secondaryBorderBackground}
              dataKey='value'
            >
              {headers.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </>
        )}
      </PieChart>
      <StyledChartLabel>
        <TypographySecondary value={'Total usage:'} size='xs-small' />
        <TypographyPrimary value={`${total}`} size='small' semiBold />
      </StyledChartLabel>
    </StyledChardWrapper>
  )
}

export default TotalValueChart

const StyledChardWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`
const StyledChartLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  gap: 4px;

  align-items: center;
`
