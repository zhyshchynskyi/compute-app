import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import styled, { useTheme } from 'styled-components'

const data = [
  { name: 'Used', value: 500 },
  { name: 'Remaining', value: 2000 },
]

const AccountUsage = () => {
  const theme = useTheme()

  const COLORS = ['#1B9DFE', theme?.body.secondaryBorderBackground || '#868686']
  const total = data.reduce((acc, entry) => acc + entry.value, 0)
  const used = data[0].value

  return (
    <StyledChardWrapper>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          startAngle={90} // Start from top
          endAngle={-270} // Complete the circle clockwise
          innerRadius={60}
          outerRadius={80}
          fill='#8884d8'
          stroke={theme?.body.secondaryBorderBackground}
          dataKey='value'
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke={theme?.body.secondaryBorderBackground}
            />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
      </PieChart>
      <StyledChartLabel>
        <TypographySecondary value={'Free usage:'} size='xs-small' />
        <TypographyPrimary value={`${used}/${total}`} size='xs-small' semiBold />
      </StyledChartLabel>
    </StyledChardWrapper>
  )
}

export default AccountUsage

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
