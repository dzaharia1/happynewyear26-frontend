import React from 'react';
import styled from 'styled-components';
import Maze from './components/Maze';
import Champagne from './components/Champagne';
import Joystick from './components/Joystick';
import { useGameLoop } from './hooks/useGameLoop';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #222;
  color: white;
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: #ffd700;
  text-shadow: 2px 2px 0px #d35400;
`;

const GameArea = styled.div`
  position: relative; // Context for absolute player
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const Instructions = styled.p`
  margin-top: 20px;
  color: #aaa;
  font-size: 0.9rem;
`;

function App() {
  const { x, y, direction, isMoving, setManualInput } = useGameLoop();

  return (
    <GameContainer>
      <Title>Pac-Maze</Title>

      <GameArea>
        <Maze />
        <Champagne x={x} y={y} direction={direction} isMoving={isMoving} />
      </GameArea>
      <Joystick onInput={setManualInput} />

      <Instructions>Use Arrow Keys or WASD to move</Instructions>
    </GameContainer>
  );
}

export default App;
