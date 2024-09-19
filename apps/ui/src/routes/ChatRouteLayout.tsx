import styled, { css } from 'styled-components'


export const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100%;
  /* overflow: hidden; */

  position: relative;
  /* gap: 20px; */
  padding-right: 16px;
`
export const StyledLeftColumn = styled.div<{
  isHidden?: boolean
  isSmallScreen?: boolean
  customWidth?: number
}>`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;

  padding-top: 0px;

  height: 100%;
  min-width: ${({ customWidth }) => (customWidth ? `${customWidth}px` : '270px')};
  max-width: ${({ customWidth }) => (customWidth ? `${customWidth}px` : '270px')};

  transition: margin-left 0.3s ease-in-out;

  border-right: ${({ theme }) => theme.body.secondaryBorder};

  /* margin: 0 16px; */

  ${props =>
    props.isHidden &&
    css`
      margin-left: -270px;
      overflow: hidden;
      cursor: pointer;

      opacity: 0;
    `}
`
export const StyledRightColumn = styled.div<{ isHidden?: boolean }>`
  backdrop-filter: blur(100px);

  overflow-y: auto;

  display: flex;
  max-width: 300px;
  min-width: 300px;

  /* padding: 16px 16px 32px 16px; */
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;

  height: 100%;

  transition: margin-right 0.3s ease-in-out;

  ${props =>
    props.isHidden &&
    css`
      margin-right: -400px;
      overflow: hidden;
      cursor: pointer;
      opacity: 0;
    `}
`

export const StyledMainWrapper = styled.div<{ customWidth?: string }>`
  /* margin-top: 30px; */
  padding: 16px;
  padding-right: 0;

  border-radius: 16px;
  /* background: var(--background-background-tertiary, #f5f5f7); */
  background: ${({ theme }) => theme.body.componentsWrapperBg};

  display: flex;
  justify-content: center;

  width: ${({ customWidth }) => (customWidth ? customWidth : '100%')};
  height: 100%;

  /* gap: 12px; */
  /* max-width: 1400px; */
`
export const StyledChatWrapper = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  overflow: auto;

  position: relative;
`
const StyledOutletWrapper = styled.div`
  width: 100%;
  height: 100%;
  /* padding: 0 30px; */

  /* max-width: 1500px; */
`
const StyledShowButton = styled.div<{ isRight?: boolean }>`
  height: 100vh;
  width: 100px;

  cursor: pointer;

  position: fixed;
  z-index: 10000;
  left: 0;

  ${props =>
    props.isRight &&
    css`
      right: 0;
      margin-left: auto;

      width: 30px;
    `}
`
const StyledMiddleArea = styled.div`
  height: 100%;
  width: calc(100% - 600px);

  cursor: pointer;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  /* left: 0; */
`

export const StyledHorizontalDivider = styled.div`
  border-bottom: ${({ theme }) => theme.body.secondaryBorder};

  width: 99%;

  margin-top: 10px;
  margin-right: auto;
`
const StyledTableWrapper = styled.div`
  padding-right: 24px;
  height: calc(100% - 50px);
  padding-top: 15px;
`
const StyledFocusButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 0;
`
