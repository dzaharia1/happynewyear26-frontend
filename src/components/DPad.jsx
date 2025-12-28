import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DPadContainer = styled.div`
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);

  width: 150px;
  height: 150px;
  touch-action: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  opacity: 0.7;
`;

// A cross shape container
const Cross = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Button = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:active,
  &.active {
    background: rgba(255, 255, 255, 0.5);
  }

  &::after {
    content: '';
    border: solid white;
    border-width: 0 4px 4px 0;
    display: inline-block;
    padding: 6px;
  }
`;

const UpButton = styled(Button)`
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  border-radius: 10px 10px 0 0;

  &::after {
    transform: rotate(-135deg);
    margin-top: 5px;
  }
`;

const DownButton = styled(Button)`
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  border-radius: 0 0 10px 10px;

  &::after {
    transform: rotate(45deg);
    margin-bottom: 5px;
  }
`;

const LeftButton = styled(Button)`
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 10px 0 0 10px;

  &::after {
    transform: rotate(135deg);
    margin-left: 5px;
  }
`;

const RightButton = styled(Button)`
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 0 10px 10px 0;

  &::after {
    transform: rotate(-45deg);
    margin-right: 5px;
  }
`;

const CenterCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  z-index: -1;
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
        <CenterCircle />
      </Cross>
    </DPadContainer>
  );
};

export default DPad;
