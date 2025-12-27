import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { TILE_SIZE } from '../constants';

const ChampagneWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${TILE_SIZE}px;
  height: ${TILE_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none; // Let clicks pass through to maze if needed
  z-index: 10;
`;

// Placeholder for sprite
const Sprite = styled.div`
  width: ${TILE_SIZE * 0.8}px;
  height: ${TILE_SIZE * 0.8}px;
  position: relative;

  &::before {
    content: '';
    position: absolute;

    width: 150%;
    height: 150%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: url(./champagne/right1.png);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

    z-index: -1;

    ${(props) =>
      props.$direction === 'left' &&
      css`
        background-image: url(./champagne/left0.png);
        ${props.$isMoving &&
        css`
          animation: left-toggle 0.4s steps(1) infinite;
        `}
        @keyframes left-toggle {
          0% {
            background-image: url(./champagne/left1.png);
          }
          50% {
            background-image: url(./champagne/left2.png);
          }
        }
      `}

    ${(props) =>
      props.$direction === 'right' &&
      css`
        background-image: url(./champagne/right0.png);
        ${props.$isMoving &&
        css`
          animation: right-toggle 0.4s steps(1) infinite;
        `}
        @keyframes right-toggle {
          0% {
            background-image: url(./champagne/right1.png);
          }
          50% {
            background-image: url(./champagne/right2.png);
          }
        }
      `}
    
    ${(props) =>
      props.$direction === 'up' &&
      css`
        background-image: url(./champagne/up0.png);
        ${props.$isMoving &&
        css`
          animation: up-toggle 0.4s steps(1) infinite;
        `}
        @keyframes up-toggle {
          0% {
            background-image: url(./champagne/up2.png);
          }
          50% {
            background-image: url(./champagne/up1.png);
          }
        }
      `}
    
    ${(props) =>
      props.$direction === 'down' &&
      css`
        background-image: url(./champagne/down1.png);
        ${props.$isMoving &&
        css`
          animation: down-toggle 0.4s steps(1) infinite;
        `}
        @keyframes down-toggle {
          0% {
            background-image: url(./champagne/down1.png);
          }
          50% {
            background-image: url(./champagne/down2.png);
          }
        }
      `}
  }

  /* Directional indicator (eye/mouth placeholder) */
  &::after {
    content: '';
    position: absolute;
    width: 20%;
    height: 20%;
    background: #ff0;
    top: 20%;
    right: 20%;
    border-radius: 50%;

    ${(props) =>
      props.$direction === 'left' &&
      css`
        // right: auto;
        top: 50%;
        right: auto;
        left: 0;
        transform: translate(0, -50%);
      `}

    ${(props) =>
      props.$direction === 'right' &&
      css`
        right: 0;
        left: auto;
        top: 50%;
        transform: translate(0, -50%);
      `}
    
    ${(props) =>
      props.$direction === 'up' &&
      css`
        top: 10%;
        right: 40%;
      `}
    
    ${(props) =>
      props.$direction === 'down' &&
      css`
        top: auto;
        bottom: 20%;
        right: 40%;
      `}
  }
`;

const Champagne = ({ x, y, direction, isMoving }) => {
  return (
    <ChampagneWrapper style={{ transform: `translate(${x}px, ${y}px)` }}>
      <Sprite $direction={direction} $isMoving={isMoving} />
    </ChampagneWrapper>
  );
};

export default Champagne;
