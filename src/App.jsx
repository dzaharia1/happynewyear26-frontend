import React from 'react';
import styled from 'styled-components';
import Maze from './components/Maze';
import Champagne from './components/Champagne';
import Joystick from './components/Joystick';
import { useGameLoop } from './hooks/useGameLoop';
import { LEVEL, TILE_SIZE } from './constants';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: #222;
  color: white;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: 700;
  line-height: 0.8;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: #c77543;
  text-shadow: 2px 2px 0px #793f3b;
`;

const GameArea = styled.div`
  position: relative; // Context for absolute player
  // box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const Instructions = styled.p`
  margin-top: 20px;
  color: #c8c8c8ff;
  font-size: 0.9rem;
`;

function App() {
  const { x, y, direction, isMoving, setManualInput } = useGameLoop();
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const handleResize = () => {
      // Calculate game dimensions dynamically
      const GAME_WIDTH = LEVEL[0].length * TILE_SIZE;
      const GAME_HEIGHT = LEVEL.length * TILE_SIZE;
      const PADDING = 40; // Buffer space

      const availableWidth = window.innerWidth - PADDING;
      const availableHeight = window.innerHeight - 200; // Leave space for title/instructions

      const scaleX = availableWidth / GAME_WIDTH;
      const scaleY = availableHeight / GAME_HEIGHT;

      const newScale = Math.min(scaleX, scaleY, 1); // Don't scale up past 1
      setScale(newScale);
    };

    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <GameContainer>
      <Title>Champer-Quest</Title>

      <GameArea
        style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
        <Maze />
        <Champagne x={x} y={y} direction={direction} isMoving={isMoving} />
      </GameArea>
      <Joystick onInput={setManualInput} />

      <Instructions>Use Arrow Keys or WASD to move</Instructions>
    </GameContainer>
  );
}

export default App;
