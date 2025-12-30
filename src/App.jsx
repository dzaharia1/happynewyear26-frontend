import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Maze from './components/Maze';
import Champagne from './components/Champagne';
import DPad from './components/DPad';
import { useGameLoop } from './hooks/useGameLoop';
import { LEVEL, TILE_SIZE, ZOOM_LEVEL } from './constants';
import PlayerIntro from './components/PlayerIntro';
import theme from './theme';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme['background-color--base']};
  color: ${(props) => props.theme['text-color--base']};
  overflow: hidden; /* Prevent scrollbars when zooming/panning */
`;

const Title = styled.h1`
  margin-bottom: 8px;
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
  margin-bottom: 8px;
  color: #c8c8c8ff;
  font-size: 0.9rem;
`;

function App() {
  const { x, y, direction, isMoving, setManualInput } = useGameLoop();
  const [hasRegistered, setHasRegistered] = useState(false);
  const [playerProfile, setPlayerProfile] = useState({
    playerName: 'Champagne',
    playerColorScheme: 'brown',
    playerUniqueID: null,
  });

  // Calculate camera offset to center the player
  // We want the player at the center of the viewport
  // Transform origin is 0 0, so we need to translate the world

  // Center of viewport
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Player position in pixels (rel to top-left of game area)
  // We use x and y from propertly useGameLoop which tracks player top-left corner
  // We want to center on the player center, so add half tile
  const playerPixelX = x + TILE_SIZE / 2;
  const playerPixelY = y + TILE_SIZE / 2;

  // The transform needs to:
  // 1. Move world so player is at (0,0) -> translate(-playerPixelX, -playerPixelY)
  // 2. Scale up -> scale(ZOOM_LEVEL)
  // 3. Move world so (0,0) is at viewport center -> translate(centerX, centerY)

  // Order of operations in CSS transform string is applied right to left (or outside in)
  // actually in CSS: transform: translate(cx, cy) scale(z) translate(-px, -py)
  // visual result:
  // start with map
  // translate map so player is at origin
  // scale map around origin (now player)
  // move origin (player) to center of screen

  const transformStyle = `translate(${centerX}px, ${centerY}px) scale(${ZOOM_LEVEL}) translate(-${playerPixelX}px, -${playerPixelY}px)`;

  const registerPlayer = (name, colorScheme) => {
    setPlayerProfile({
      playerName: name,
      playerColorScheme: colorScheme,
      playerUniqueID: null,
    });
    setHasRegistered(true);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* {!hasRegistered && <PlayerIntro onSubmit={registerPlayer} />} */}
      <GameContainer>
        <div
          style={{
            position: 'fixed',
            top: 20,
            left: 0,
            width: '100%',
            zIndex: 100,
            pointerEvents: 'none', // Let clicks pass through to game if needed
          }}>
          <Title>Champer-Quest</Title>
          <Instructions>Use Arrow Keys or WASD to move</Instructions>
        </div>

        <GameArea
          style={{
            transform: transformStyle,
            transformOrigin: '0 0',
            position: 'absolute',
            left: 0,
            top: 0,
          }}>
          <Maze />
          <Champagne
            x={x}
            y={y}
            direction={direction}
            isMoving={isMoving}
            iscurrplayer={true}
            playerprofile={playerProfile}
          />
        </GameArea>
        <DPad onInput={setManualInput} />
      </GameContainer>
    </ThemeProvider>
  );
}

export default App;
