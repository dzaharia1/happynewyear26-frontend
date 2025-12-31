import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import UILabel from './UILabel';
import Item from './Item';
import {
  TILE_SIZE,
  LAYER_LEVELS,
  PRELOAD_IMAGES,
  COLOR_SCHEMES,
} from '../constants';

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

  /* Smoothly interpolate movement for remote players */
  transition: ${(props) =>
    props.iscurrplayer === 'true'
      ? 'none'
      : 'top 0.05s linear, left 0.05s linear'};
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

    background: url(./champagne/${(props) => props.colorscheme}/right1.png);
    background-size: contain;
    background-position: calc(50% + 6px) center;
    background-repeat: no-repeat;

    z-index: ${LAYER_LEVELS.cat};

    ${(props) =>
      props.$direction === 'left' &&
      css`
        background-image: url(./champagne/${props.colorscheme}/left0.png);
        ${props.$isMoving &&
        css`
          animation: ${keyframes`
            0% {
              background-image: url(./champagne/${props.colorscheme}/left1.png);
            }
            50% {
              background-image: url(./champagne/${props.colorscheme}/left2.png);
            }
          `} 0.4s steps(1) infinite;
        `}
      `}

    ${(props) =>
      props.$direction === 'right' &&
      css`
        background-image: url(./champagne/${props.colorscheme}/right0.png);
        ${props.$isMoving &&
        css`
          animation: ${keyframes`
            0% {
              background-image: url(./champagne/${props.colorscheme}/right1.png);
            }
            50% {
              background-image: url(./champagne/${props.colorscheme}/right2.png);
            }
          `} 0.4s steps(1) infinite;
        `}
      `}
    
    ${(props) =>
      props.$direction === 'up' &&
      css`
        background-image: url(./champagne/${props.colorscheme}/up0.png);
        ${props.$isMoving &&
        css`
          animation: ${keyframes`
            0% {
              background-image: url(./champagne/${props.colorscheme}/up2.png);
            }
            50% {
              background-image: url(./champagne/${props.colorscheme}/up1.png);
            }
          `} 0.4s steps(1) infinite;
        `}
      `}
    
    ${(props) =>
      props.$direction === 'down' &&
      css`
        background-image: url(./champagne/${props.colorscheme}/down0.png);
        ${props.$isMoving &&
        css`
          animation: ${keyframes`
            0% {
              background-image: url(./champagne/${props.colorscheme}/down1.png);
            }
            50% {
              background-image: url(./champagne/${props.colorscheme}/down2.png);
            }
          `} 0.4s steps(1) infinite;
        `}
      `}
  }
`;

const Champagne = ({
  x,
  y,
  iscurrplayer = 'false',
  playerprofile,
  chatmessage,
  direction,
  isMoving,
  item = 'champagneglass',
  chatTimestamp,
}) => {
  const [showChatMessage, setShowChatMessage] = useState(false);
  const [pickupItem, setPickupItem] = useState('champagneglass');

  useEffect(() => {
    if (chatmessage) {
      setShowChatMessage(true);
      const timer = setTimeout(() => setShowChatMessage(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [chatmessage, chatTimestamp]);

  return (
    <ChampagneWrapper
      iscurrplayer={iscurrplayer}
      style={{ left: `${x}px`, top: `${y}px` }}>
      <Sprite
        $direction={direction}
        $isMoving={isMoving}
        colorscheme={playerprofile.playerColorScheme}
      />
      <UILabel
        colorscheme={playerprofile.playerColorScheme}
        text={
          playerprofile.playerName + (showChatMessage ? ': ' + chatmessage : '')
        }
      />
      {/* {item !== 'none' && <Item item={pickupItem} />} */}
    </ChampagneWrapper>
  );
};

export default Champagne;
