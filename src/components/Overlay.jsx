import React from 'react';
import styled from 'styled-components';

const OverlayContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: ${(props) => props.theme.spacing.lg};
  // width: 80%;
  // height: 80%;

  background-color: ${(props) => props.theme['background-color--base']};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
