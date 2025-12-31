import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LAYER_LEVELS } from '../../constants';

const DPadContainer = styled.div`
  position: fixed;
  bottom: 30px;
  left: 30px;

  width: 150px;
  height: 150px;
  touch-action: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${LAYER_LEVELS.controls};
`;

const SpriteBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/d-pad.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  // opacity: 0.8;
  pointer-events: none;
`;

// A cross shape container
const Cross = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Button = styled.div`
  position: absolute;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:active,
  &.active {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const UpButton = styled(Button)`
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
`;

const DownButton = styled(Button)`
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
`;

const LeftButton = styled(Button)`
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
`;

const RightButton = styled(Button)`
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
`;

const DPad = ({ onInput }) => {
  const [activeDirection, setActiveDirection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (
        /android/i.test(userAgent) ||
        (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
      ) {
        setIsMobile(true);
      }
    };
    checkMobile();
  }, []);

  const handleStart = (dir, x, y) => (e) => {
    e.preventDefault(); // Prevent scrolling/selecting
    setActiveDirection(dir);
    onInput({ x, y });
  };

  const handleEnd = (e) => {
    e.preventDefault();
    setActiveDirection(null);
    onInput({ x: 0, y: 0 });
  };

  if (!isMobile) return null;

  return (
    <DPadContainer>
      <SpriteBackground />
      <Cross>
        <UpButton
          className={activeDirection === 'up' ? 'active' : ''}
          onTouchStart={handleStart('up', 0, -1)}
          onTouchEnd={handleEnd}
        />
        <DownButton
          className={activeDirection === 'down' ? 'active' : ''}
          onTouchStart={handleStart('down', 0, 1)}
          onTouchEnd={handleEnd}
        />
        <LeftButton
          className={activeDirection === 'left' ? 'active' : ''}
          onTouchStart={handleStart('left', -1, 0)}
          onTouchEnd={handleEnd}
        />
        <RightButton
          className={activeDirection === 'right' ? 'active' : ''}
          onTouchStart={handleStart('right', 1, 0)}
          onTouchEnd={handleEnd}
        />
      </Cross>
    </DPadContainer>
  );
};

export default DPad;
