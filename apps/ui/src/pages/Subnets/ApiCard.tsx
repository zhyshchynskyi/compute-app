import TypographySecondary from 'components/Typography/Secondary'
import TypographyPrimary from 'components/Typography/Primary'

import { textSlicer } from 'utils/textSlicer'
import Switcher from './Switcher'

import IconButton from 'share-ui/components/IconButton/IconButton'
import {
    StyledEyeOpenIcon,
    StyledDeleteIcon,
    StyledEditIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import Button from 'share-ui/components/Button/Button'
import {
    StyledApiCard,
    StyledAvatarWrapper,
    StyledBodyTextWrapper,
    StyledCardHeader,
    // StyledIcon,
    StyledImg,
    StyledSwitcherWrapper,
    StyledTitleWrapper,
    StyledCardBody,
    StyledButtonWrapper,
    StyledIconWrapper,
} from './ApiCardStyles'
import { Account, accountTypeEnum } from 'types/account'
import styled from 'styled-components'

import { SubnetApiService } from 'types/subnetApiService'
import TypographyTertiary from 'components/Typography/Tertiary'
import strCutter from 'utils/strCutter'
import Tooltip from 'share-ui/components/Tooltip/Tooltip'

type ApiCardProps = {
    item: SubnetApiService
    headerText?: string

    onViewClick?: () => void
    avatar?: string
    account?: Account
    handleDelete?: (
        event: React.MouseEvent<Element, MouseEvent>,
        subnet_api_service_id: string,
    ) => void
    handleEdit?: (subnet_api_service_id: string) => void
    handleToggle?: (subnet_api_service_id: string) => void
    isChecked?: boolean
    customButtons?: React.ReactNode
}

const ApiCard = ({
    item,
    onViewClick,
    account,
    handleDelete,
    // avatar,
    handleEdit,
    handleToggle,
    isChecked = false,
    customButtons,
}: ApiCardProps) => {
    const { shortText: shortName } = textSlicer(item?.name, 25)

    return (
        <StyledApiCard>
            <StyledCardHeader>
                <StyledAvatarWrapper>
                    <StyledImg src={item?.icon} />
                </StyledAvatarWrapper>

                <StyledTitleWrapper>
                    <TypographyPrimary value={shortName} size={'small'} />
                </StyledTitleWrapper>

                <StyledSwitcherWrapper>
                    {account?.account_type === accountTypeEnum.Subnet_api ? (
                        <>
                            {handleToggle && (
                                <Switcher
                                    handleToggle={() => handleToggle(item?.id)}
                                    checked={isChecked}
                                />
                            )}
                        </>
                    ) : (
                        <StyledActionContainer>
                            {handleEdit && (
                                <IconButton
                                    onClick={() => handleEdit(item?.id)}
                                    icon={() => <StyledEditIcon />}
                                    size={IconButton.sizes?.SMALL}
                                    kind={IconButton.kinds?.TERTIARY}
                                    ariaLabel='Edit'
                                />
                            )}
                            {handleDelete && (
                                <IconButton
                                    onClick={(event: React.MouseEvent<Element, MouseEvent>) =>
                                        handleDelete(event, item?.id)
                                    }
                                    icon={() => <StyledDeleteIcon />}
                                    size={IconButton.sizes?.SMALL}
                                    kind={IconButton.kinds?.TERTIARY}
                                    ariaLabel='Delete'
                                    disabled={false}
                                />
                            )}
                        </StyledActionContainer>
                    )}
                </StyledSwitcherWrapper>
            </StyledCardHeader>
            <StyledCardBody>
                <StyledBodyTextWrapper>
                    <TypographySecondary value={item?.description} size={'small'} />
                </StyledBodyTextWrapper>
            </StyledCardBody>

            <StyledFooter>
                {item?.subnet_name && (
                    <Tooltip content={item?.subnet_name}>
                        <StyledSubnetNameWrapper>
                            <TypographyTertiary
                                value={strCutter(item?.subnet_name, 20, true)}
                                size='xs-small'
                                semiBold
                            />
                        </StyledSubnetNameWrapper>
                    </Tooltip>
                )}
                <StyledButtonWrapper className='footerButtons'>
                    {customButtons}
                    {onViewClick && (
                        <IconButton
                            onClick={onViewClick}
                            icon={() => (
                                <StyledIconWrapper>
                                    <StyledEyeOpenIcon />
                                </StyledIconWrapper>
                            )}
                            size={Button.sizes?.SMALL}
                            kind={IconButton.kinds?.TERTIARY}
                            // ariaLabel='Details'
                        />
                    )}
                </StyledButtonWrapper>
            </StyledFooter>
        </StyledApiCard>
    )
}

export default ApiCard

const StyledActionContainer = styled.div`
    display: flex;
`
const StyledFooter = styled.div`
    display: flex;
    align-items: center;

    width: 100%;
`
const StyledSubnetNameWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 4px;

    border-radius: 8px;
    border: ${({ theme }) => theme.body.secondaryBorder};
`
