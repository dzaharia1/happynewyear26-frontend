import React from 'react';
import styled, { keyframes } from 'styled-components';
import { TILE_SIZE, ZOOM_LEVEL } from '../constants';

const pulse = keyframes`
  0% {
    transform: translate(-50%, -100%) scale(0.8);
    opacity: 0.8;
  }
  50% {
    transform: translate(-50%, -100%) scale(1.1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -100%) scale(0.8);
    opacity: 0.8;
  }
`;

const Indicator = styled.div`
  position: absolute;
  width: ${TILE_SIZE * 1.5}px;
  height: ${TILE_SIZE * 1.5}px;
  left: ${(props) => props.x + TILE_SIZE / 2}px;
  top: ${(props) => props.y}px;
  background-image: url('./pickups/pickupindicator.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;
  pointer-events: none;
  z-index: 2000;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

const PickupObjectIndicator = ({ x, y }) => {
    return <Indicator x={x} y={y} />;
};

export default PickupObjectIndicator;
