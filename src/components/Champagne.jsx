import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { TILE_SIZE, LAYER_LEVELS, PRELOAD_IMAGES, COLOR_SCHEMES } from '../constants';

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
  transition: ${(props) => props.iscurrplayer === 'true' ? 'none' : 'top 0.05s linear, left 0.05s linear'};
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

const baseBorderWidth = 3;
const GamerTag = styled.div`
  position: absolute;
  bottom: calc(100% + 15px);
  left: 50%;
  transform: translateX(-50%);

  color: ${(props) =>
    COLOR_SCHEMES.find(scheme => scheme.name === props.colorscheme)?.text || '#c5bfbfff'};
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;

  background-color: ${(props) =>
    COLOR_SCHEMES.find(scheme => scheme.name === props.colorscheme)?.background || '#793F3B'};
  padding: 2px 6px;
  border-style: solid;
  border-width: ${baseBorderWidth}px 0 ${baseBorderWidth * 2}px 0;
  border-color: ${(props) =>
    COLOR_SCHEMES.find(scheme => scheme.name === props.colorscheme)?.border || '#471d1aff'};
  pointer-events: none; // Let clicks pass through to maze if needed

  z-index: ${LAYER_LEVELS.gamertags};

  &::after,
  &::before {
    position: absolute;
    content: '';
    right: 100%;
    top: calc(0px - ${baseBorderWidth}px + 2px);
    height: calc(100% + ${baseBorderWidth * 2}px - 2px);
    width: ${baseBorderWidth}px;
    background-color: ${(props) => COLOR_SCHEMES.find(scheme => scheme.name === props.colorscheme)?.border};
  }

  &::after {
    left: 100%;
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
}) => {
  const [showChatMessage, setShowChatMessage] = useState(false);

  useEffect(() => {
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (chatmessage) {
      setShowChatMessage(true);
      setTimeout(() => setShowChatMessage(false), 7000);
    }
  }, [chatmessage]);

  return (
    <ChampagneWrapper
      iscurrplayer={iscurrplayer}
      style={{ left: `${x}px`, top: `${y}px` }}>
      <Sprite
        $direction={direction}
        $isMoving={isMoving}
        colorscheme={playerprofile.playerColorScheme}
      />
      <GamerTag colorscheme={playerprofile.playerColorScheme}>
        {showChatMessage ? chatmessage : playerprofile.playerName}
      </GamerTag>
    </ChampagneWrapper>
  );
};

export default Champagne;
