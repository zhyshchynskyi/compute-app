import styled from 'styled-components';

export const StyledDetailsBox = styled.div`
  background: ${({ theme }) => theme.body.componentsWrapperBg};
  /* border: ${({ theme }) => theme.body.secondaryBorder}; */
  width: 100%;
  max-width: 300px;
  min-width: 300px;
  height: fit-content;
  /* min-height: 400px; */

  border-radius: 10px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  white-space: pre-line;
`;

export const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.body.placeHolderColor};
`;
export const StyledInnerButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-right: 5px;
`;
export const StyledNameWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  gap: 5px;

  font-weight: 700;
`;
export const StyledMenuButtonsWrapper = styled.div`
  background: ${({ theme }) => theme.body.backgroundColorSecondary};
  border: ${({ theme }) => theme.body.secondaryBorder};
  backdrop-filter: blur(100px);
  padding: 10px;
  border-radius: 10px;

  min-width: fit-content;

  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const StyledIconButton = styled.div`
  .components-IconButton-IconButton-module__iconButtonContainer--ttuRB {
    &:hover {
      background: ${({ theme }) => theme.body.humanMessageBgColor};
      border-radius: 50%;
    }
  }
`;
const StyledDropdownWrapper = styled.div`
  font-weight: 500;
`;
