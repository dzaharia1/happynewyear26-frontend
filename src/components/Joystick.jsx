import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const JoystickContainer = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50%;
  transform: translateX(50%);
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  touch-action: none; // Prevent scrolling while using joystick
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  z-index: 100;
`;

const JoystickKnob = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  position: absolute;
  transform: translate(${(props) => props.$x}px, ${(props) => props.$y}px);
  transition: ${(props) =>
    props.$isDragging ? 'none' : 'transform 0.1s ease-out'};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Joystick = ({ onInput }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Simple mobile detection
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

  const handleTouchStart = (e) => {
    setIsDragging(true);
    handleTouchMove(e);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;

    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    let dx = touch.clientX - centerX;
    let dy = touch.clientY - centerY;

    // Cap the distance to keep knob inside container
    const maxDist = rect.width / 2 - 25; // 25 is half knob width
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > maxDist) {
      const angle = Math.atan2(dy, dx);
      dx = Math.cos(angle) * maxDist;
      dy = Math.sin(angle) * maxDist;
    }

    setPosition({ x: dx, y: dy });

    // Dead zone check
    const deadZone = 15;
    if (distance < deadZone) {
      onInput({ x: 0, y: 0 });
      return;
    }

    // Determine direction
    // We want to map this to x: -1/0/1, y: -1/0/1
    // Use a threshold to avoid jitter
    const threshold = 10;
    let inputX = 0;
    let inputY = 0;

    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal movement dominant
      if (Math.abs(dx) > threshold) {
        inputX = dx > 0 ? 1 : -1;
      }
    } else {
      // Vertical movement dominant
      if (Math.abs(dy) > threshold) {
        inputY = dy > 0 ? 1 : -1;
      }
    }

    onInput({ x: inputX, y: inputY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
    onInput({ x: 0, y: 0 });
  };

  if (!isMobile) return null;

  return (
    <JoystickContainer
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      <JoystickKnob $x={position.x} $y={position.y} $isDragging={isDragging} />
    </JoystickContainer>
  );
};

export default Joystick;
