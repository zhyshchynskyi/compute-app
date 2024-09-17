import ContentLoader from 'react-content-loader'
import styled, { useTheme } from 'styled-components'

const ApiCardLoader = () => {
    const theme = useTheme()
    return (
        <StyledRootBox>
            <StyledCardLayoutBox>
                <ContentLoader
                    height={185}
                    width={335}
                    viewBox='0 0 335 185'
                    backgroundColor={theme?.contentLoader.bgColor}
                    foregroundColor={theme?.contentLoader.fgColor}
                >
                    {/* Avatar or Icon */}
                    <rect x='15' y='13' rx='5' ry='5' width='34' height='34' />

                    {/* Title */}
                    <rect x='60' y='20' rx='5' ry='5' width='200' height='20' />

                    {/* Switcher or Action Buttons */}
                    <rect x='270' y='20' rx='5' ry='5' width='50' height='20' />

                    {/* Description */}
                    <rect x='15' y='60' rx='5' ry='5' width='305' height='15' />
                    <rect x='15' y='80' rx='5' ry='5' width='305' height='15' />
                    <rect x='15' y='100' rx='5' ry='5' width='305' height='15' />

                    {/* Footer Buttons */}
                    <rect x='20' y='145' rx='5' ry='5' width='100' height='20' />
                    <rect x='200' y='145' rx='5' ry='5' width='50' height='20' />
                    <rect x='260' y='145' rx='5' ry='5' width='50' height='20' />
                </ContentLoader>
            </StyledCardLayoutBox>
        </StyledRootBox>
    )
}

export default ApiCardLoader

const StyledRootBox = styled.div`
    display: flex;

    border: ${({ theme }) => `1px solid ${theme.contentLoader.borderColor}`};

    border-radius: 22px;

    background-color: ${({ theme }) => theme.contentLoader.mainBgColor};
`

const StyledCardLayoutBox = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`
