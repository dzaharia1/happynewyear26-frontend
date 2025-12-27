import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { TILE_SIZE } from '../constants';

const PlayerWrapper = styled.div`
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
  background-color: #ffd700; // Pac-Man Yellow
  border-radius: 50%;
  position: relative;

  /* Directional indicator (eye/mouth placeholder) */
  &::after {
    content: '';
    position: absolute;
    width: 20%;
    height: 20%;
    background: #000;
    top: 20%;
    right: 20%;
    border-radius: 50%;

    ${(props) =>
      props.$direction === 'left' &&
      css`
        right: auto;
        left: 20%;
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

const Player = ({ x, y, direction, isMoving }) => {
  return (
    <PlayerWrapper style={{ transform: `translate(${x}px, ${y}px)` }}>
      <Sprite $direction={direction} />
    </PlayerWrapper>
  );
};

export default Player;
