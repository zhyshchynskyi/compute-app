import { useNavigate } from 'react-router-dom'
import { StyledHeaderGroup, StyledSectionWrapper } from './homeStyle.css'
import HeadingPrimary from 'components/Heading/Primary'
import Heading from 'share-ui/components/Heading/Heading'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledCardsWrapper } from 'pages/Agents/Agents'

import PodsMainCard from 'pages/Pods/PodsMainCard'

import UsageChart from 'pages/Pods/components/charts/UsageChart'

import ComingSoonContainer from 'components/ComingSoonContainer'

import { StyledMainHeaderWrapper } from './Home'

const TEMP_DATA = [
    {
        name: 'RTX 4090',
        price: '$0.74/hr',
        ram: '48 GB RAM',
        vram: '125 GB RAM',
        cram: '28 vCPU',
        id: 1,
        uptime: '11d',
        cpu: { utl: 10, mem: 50 },
        gpu: { utl: 50, mem: 20 },
    },
    {
        name: 'RTX 6000 Ada',
        price: '$2.01/hr',
        ram: '32 GB RAM',
        vram: '150 GB RAM',
        cram: '32 vCPU',
        id: 5,
        uptime: '1d',
        cpu: { utl: 5, mem: 0 },
        gpu: { utl: 10, mem: 10 },
    },
    {
        name: 'H100 PCIe',
        price: '$0.74/hr',
        ram: '48 GB RAM',
        vram: '125 GB RAM',
        cram: '32 vCPU',
        id: 14,
        uptime: '20d',
        cpu: { utl: 70, mem: 20 },
        gpu: { utl: 10, mem: 80 },
    },
]

const ComputeHome = () => {
    const navigate = useNavigate()

    return (
        <>
            <StyledSectionWrapper>
                <StyledHeaderGroup className='header_group'>
                    <StyledMainHeaderWrapper>
                        <HeadingPrimary type={Heading.types?.h1} size='xss' value={`Usage`} />
                    </StyledMainHeaderWrapper>
                </StyledHeaderGroup>

                <ComponentsWrapper noPadding>
                    <ComingSoonContainer isDisabled={false}>
                        <UsageChart />
                    </ComingSoonContainer>
                </ComponentsWrapper>
            </StyledSectionWrapper>

            <StyledSectionWrapper>
                <StyledHeaderGroup className='header_group'>
                    <StyledMainHeaderWrapper>
                        <HeadingPrimary type={Heading.types?.h1} size='xss' value={`Pods`} />
                    </StyledMainHeaderWrapper>
                </StyledHeaderGroup>

                <ComponentsWrapper noPadding>
                    <StyledCardsWrapper>
                        {TEMP_DATA.slice(0, 3).map(data => {
                            return (
                                <PodsMainCard
                                    key={data.name}
                                    name={data.name}
                                    description={`${data.cram} ${data.ram}`}
                                    teamAgents={[]}
                                    onViewClick={() => navigate('/pods/create-pod')}
                                    price={data.price}
                                    uptime={data.uptime}
                                    cpu={data.cpu}
                                    gpu={data.gpu}
                                />
                            )
                        })}
                    </StyledCardsWrapper>
                </ComponentsWrapper>
            </StyledSectionWrapper>
        </>
    )
}

export default ComputeHome
