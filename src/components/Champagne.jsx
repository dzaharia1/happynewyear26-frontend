import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { TILE_SIZE } from '../constants';

const COLOR_SCHEMES = {
  brown: {
    background: '#793F3B',
    border: '#471d1aff',
  },
};

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
    background-position: calc(50% + 6px) center;
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

const baseBorderWidth = 3;
const GamerTag = styled.div`
  position: absolute;
  bottom: calc(100% + 15px);
  left: 50%;
  transform: translateX(-50%);

  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;

  background-color: ${(props) => COLOR_SCHEMES[props.colorscheme].background};
  padding: 2px 6px;
  border-style: solid;
  border-width: ${baseBorderWidth}px 0 ${baseBorderWidth * 2}px 0;
  border-color: ${(props) => COLOR_SCHEMES[props.colorscheme].border};
  pointer-events: none; // Let clicks pass through to maze if needed

  z-index: 10;

  &::after,
  &::before {
    position: absolute;
    content: '';
    right: 100%;
    top: calc(0px - ${baseBorderWidth}px + 2px);
    height: calc(100% + ${baseBorderWidth * 2}px - 2px);
    width: ${baseBorderWidth}px;
    background-color: ${(props) => COLOR_SCHEMES[props.colorscheme].border};
  }

  &::after {
    left: 100%;
  }
`;

const Champagne = ({
  x,
  y,
  isCurrPlayer,
  uniqueid,
  playername,
  colorscheme,
  direction,
  isMoving,
}) => {
  useEffect(() => {
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <ChampagneWrapper
      isCurrPlayer={isCurrPlayer}
      style={{ transform: `translate(${x}px, ${y}px)` }}>
      <Sprite $direction={direction} $isMoving={isMoving} />
      <GamerTag colorscheme={colorscheme}>{playername}</GamerTag>
    </ChampagneWrapper>
  );
};

export default Champagne;
