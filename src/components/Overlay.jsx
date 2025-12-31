import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const OverlayContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: ${(props) => props.theme.spacing.lg};
  border-width: 0 ${theme.inputBorderWidth}px;
  border-style: solid;
  border-color: ${theme['input-border-color']};
  width: 90%;

  background-color: ${(props) => props.theme['background-color--base']};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: 600px;

  &:after,
  &:before {
    content: '';
    position: absolute;
    height: ${theme.inputBorderWidth}px;
    background-color: ${theme['input-border-color']};
    z-index: -1;
  }

  &:before {
    top: -${theme.inputBorderWidth}px;
    left: 0;
    right: 0;
  }

  &:after {
    bottom: -${theme.inputBorderWidth}px;
    left: 0;
    right: 0;
  }
`;

const OverlayScrim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const OverlayTitle = styled.h3`
  margin-bottom: 20px;
`;

const OverlayContent = styled.div`
  margin-bottom: 20px;
`;

export const Overlay = ({ title, children }) => {
  return (
    <OverlayScrim>
      <OverlayContainer>
        {/* <OverlayTitle>{title}</OverlayTitle> */}
        <OverlayContent>{children}</OverlayContent>
      </OverlayContainer>
    </OverlayScrim>
  );
};

export default Overlay;
