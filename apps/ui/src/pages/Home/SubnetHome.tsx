import styled from 'styled-components'

import { StyledHeaderGroup, StyledSectionWrapper } from './homeStyle.css'
import HeadingPrimary from 'components/Heading/Primary'
import Heading from 'share-ui/components/Heading/Heading'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import ComingSoonContainer from 'components/ComingSoonContainer'

import LogsTable from './components/LogsTable'
import useReport from './useReport'

import SubnetChart from 'pages/Subnets/charts/SubnetChart'
import {
  // SUBNET_CHART_TEMP_DATA,
  SUBNET_CHART_TEMP_DATA2,
  SUBNET_CHART_TEMP_DATA3,
} from 'pages/Subnets/charts/constants'
import SDKs from 'pages/Subnets/SDKs'

import { StyledMainHeaderWrapper } from './Home'

import SubnetUsageTable from './components/SubnetUsageTable'
import TotalValueChart from './components/Charts/TotalValueChart'
import SubnetApiCards from './components/SubnetApiCards'

const SubnetHome = () => {
  const { monthly_usage, subnet_usages } = useReport()

  return (
    <>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <StyledMainHeaderWrapper>
            <HeadingPrimary type={Heading.types?.h1} size='xss' value={`Usage`} />
          </StyledMainHeaderWrapper>
        </StyledHeaderGroup>

        <ComponentsWrapper>
          <StyledFlexColumn>
            <SubnetUsageTable data={subnet_usages} />
          </StyledFlexColumn>

          <StyledDescriptionWrapper>
            <TotalValueChart data={subnet_usages} />
          </StyledDescriptionWrapper>
        </ComponentsWrapper>

        <StyledChartsDivider />

        <ComponentsWrapper>
          <StyledChartsWrapper>
            <SubnetChart label='Monthly Spend' data={monthly_usage?.slice().reverse()} />
          </StyledChartsWrapper>
        </ComponentsWrapper>
      </StyledSectionWrapper>

      <SubnetApiCards />

      <StyledSectionWrapper>
        <StyledHeaderGroup>
          <StyledMainHeaderWrapper>
            <HeadingPrimary type={Heading.types?.h1} size='xss' value={`Latest Logs`} />
          </StyledMainHeaderWrapper>
        </StyledHeaderGroup>

        <ComponentsWrapper>
          <LogsTable />
        </ComponentsWrapper>
      </StyledSectionWrapper>

      <StyledSectionWrapper>
        <StyledHeaderGroup>
          <StyledMainHeaderWrapper>
            <HeadingPrimary type={Heading.types?.h1} size='xss' value={`SDKs`} />
          </StyledMainHeaderWrapper>
        </StyledHeaderGroup>

        <ComponentsWrapper>
          <SDKs />
        </ComponentsWrapper>

        <StyledChartsDivider />

        <ComponentsWrapper>
          <StyledChartsWrapper>
            <ComingSoonContainer>
              <StyledSmallCharts>
                <SubnetChart label='GPT-4 Turbo' data={SUBNET_CHART_TEMP_DATA2} secondary />
                <SubnetChart label='GPT-3.5 Turbo' data={SUBNET_CHART_TEMP_DATA3} secondary />
              </StyledSmallCharts>
            </ComingSoonContainer>
          </StyledChartsWrapper>
        </ComponentsWrapper>
      </StyledSectionWrapper>
    </>
  )
}

export default SubnetHome

const StyledChartsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  height: 100%;
`
const StyledSmallCharts = styled.div`
  display: flex;
  /* scale: ; */
  width: 100%;
  height: 100%;
`

const StyledChartsDivider = styled.div`
  width: 100%;

  margin: 10px 0;
`

const StyledDescriptionWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
`
const StyledFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  width: 70%;
`
