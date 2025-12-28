import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { TILE_SIZE } from '../constants';

const PRELOAD_IMAGES = [
  './champagne/right0.png',
  './champagne/right1.png',
  './champagne/right2.png',
  './champagne/left0.png',
  './champagne/left1.png',
  './champagne/left2.png',
  './champagne/up0.png',
  './champagne/up1.png',
  './champagne/up2.png',
  './champagne/down0.png',
  './champagne/down1.png',
  './champagne/down2.png',
];

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
  width: 100%;
  height: 100%;
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
        background-image: url(./champagne/down0.png);
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
`;

const Champagne = ({ x, y, direction, isMoving }) => {
  useEffect(() => {
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <ChampagneWrapper style={{ transform: `translate(${x}px, ${y}px)` }}>
      <Sprite $direction={direction} $isMoving={isMoving} />
    </ChampagneWrapper>
  );
};

export default Champagne;
