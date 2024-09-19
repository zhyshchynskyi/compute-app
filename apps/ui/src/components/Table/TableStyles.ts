import NavigationChevronLeft from 'share-ui/components/Icon/Icons/components/NavigationChevronLeft'
import NavigationChevronRight from 'share-ui/components/Icon/Icons/components/NavigationChevronRight'
import styled, { css } from 'styled-components'

export const StyledRoot = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;

    box-shadow: ${({ theme }) => theme.body.boxShadow};
    margin-bottom: 4px;

    ::-webkit-scrollbar {
        width: 0; /* This will hide the scrollbar */
    }
    body {
        scrollbar-width: none; /* This will hide the scrollbar */
    }

    border-radius: 24px;

    position: relative;

    border: 1px solid ${({ theme }) => theme.body.dialogBorder};
`

export const StyledTable = styled.table`
    height: 100%;
    min-height: 200px;
    width: 100%;

    color: ${({ theme }) => theme.typography.contentPrimary};

    background: ${({ theme }) => theme.body.backgroundColorPrimary};
`
export const StyledThead = styled.thead`
    background: ${({ theme }) => theme.body.backgroundColorPrimary};

    display: flex;
    z-index: 1;
    position: sticky;
    top: 0px;
    margin: 0 0 0 0;
`
export const StyledTbody = styled.tbody`
    display: flex;
    flex-direction: column;
`

export const StyledTr = styled.tr<{
    bodyRow?: boolean
    isSelected?: boolean
    hasHiddenContent?: boolean
}>`
    height: 35px;

    display: flex;
    :hover {
        ${p =>
            p.bodyRow &&
            css`
                background-color: ${({ theme }) => theme.body.detailCardBackgroundColor};
            `};
    }

    ${p =>
        p.isSelected &&
        css`
            background-color: ${({ theme }) => theme.body.detailCardBackgroundColor};

            :hover {
                background-color: ${({ theme }) => theme.body.detailCardBackgroundColor};
            }
        `};

    ${({ hasHiddenContent }) =>
        hasHiddenContent &&
        css`
            cursor: pointer;
        `}
`
export const StyledTh = styled.th`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0px 20px;

    border-right: ${({ theme }) => theme.body.secondaryBorder};
    border-bottom: ${({ theme }) => theme.body.secondaryBorder};

    overflow: hidden;
    :hover {
        background-color: ${({ theme }) => theme.body.detailCardBackgroundColor};
    }

    user-select: none;
    position: relative;
`

export const PaginationWrapper = styled.div`
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 10px;
    z-index: 1;

    background-color: ${({ theme }) => theme.body.backgroundColorPrimary};
`

export const PageNumber = styled.div<{ active?: boolean; readOnly?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    cursor: pointer;
    font-size: 15px;
    /* font-family: Circular, sans-serif; */
    font-weight: normal;
    font-style: normal;
    width: 30px;
    height: 30px;

    color: ${({ theme }) => theme.body.textColorPrimary};

    &:hover {
        background: ${({ theme }) => theme.body.humanMessageBgColor};
        border-radius: 5px;
    }
    ${({ active }) =>
        active &&
        css`
            font-weight: bold;
            border: ${({ theme }) => theme.body.secondaryBorder};
            width: 30px;
            height: 30px;
            border-radius: 5px;
        `}
    ${({ readOnly }) =>
        readOnly &&
        css`
            :hover {
                background-color: unset;
                cursor: auto;
            }
        `}
`

export const StyledNavigationChevronLeft = styled(NavigationChevronLeft)`
    path {
        color: ${({ theme }) => theme.body.iconColor};
    }
`

export const StyledNavigationChevronRight = styled(NavigationChevronRight)`
    path {
        color: ${({ theme }) => theme.body.iconColor};
    }
`

export const StyledLoaderWrapper = styled.div`
    position: absolute;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
