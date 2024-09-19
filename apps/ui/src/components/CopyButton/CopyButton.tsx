import { useState } from 'react'
import styled from 'styled-components'

import Check from 'share-ui/components/Icon/Icons/components/Check'
import Copy from 'share-ui/components/Icon/Icons/components/Copy'

type CopyButtonProps = {
    onCopyClick?: () => void
    value?: string
}

const CopyButton = ({ onCopyClick, value = '' }: CopyButtonProps) => {
    const [copied, setCopied] = useState(false)

    const handleDefaultClick = () => {
        navigator.clipboard.writeText(value)
    }

    const handleCopyClick = () => {
        if (onCopyClick) {
            onCopyClick()
        } else {
            handleDefaultClick()
        }

        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

    return (
        <StyledActionButton onClick={handleCopyClick}>
            {copied ? <StyledCheckIcon size={20} /> : <StyledCopyIcon size={20} />}
        </StyledActionButton>
    )
}

export default CopyButton

export const StyledActionButton = styled.div`
    opacity: 0.5;
    :hover {
        opacity: 1;
        cursor: pointer;
    }

    padding-bottom: 2px;
`

const StyledCopyIcon = styled(Copy)`
    path {
        fill: ${({ theme }) => theme.body.iconColor};
    }
`
const StyledCheckIcon = styled(Check)`
    path {
        fill: ${({ theme }) => theme.body.iconColor};
    }
`
