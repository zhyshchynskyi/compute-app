import styled from 'styled-components'

export const StyledFormWrapper = styled.div`
  width: 100%;

  height: 100%;
`
export const StyledFormRoot = styled.div`
  width: 100%;

  height: 100%;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
`
export const StyledFormInputWrapper = styled.div<{ noPadding?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: ${props => (props.noPadding ? '0' : '0 20px')};
`
export const StyledHeaderTextWrapper = styled.div`
  width: 100%;
`
export const StyledAbsoluteLoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
export const StyledFormHeader = styled.header`
  min-height: 60px;
  max-height: 60px;
  padding: 2px 20px;
  padding-bottom: 12px;

  position: sticky;
  width: 100%;
  top: 0;
  z-index: 10;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${({ theme }) => theme.body.componentsWrapperBg};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    /* left: 20px; // Match the padding
    right: -20px; // Match the padding */
    height: 1px; // Adjust the height as needed
    width: calc(100% - 40px);
    background: ${({ theme }) => theme.body.secondaryBorderBackground};
  }
`
