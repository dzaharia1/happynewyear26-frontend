import React, { useState, useEffect, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { io } from 'socket.io-client';
import Maze from './components/Maze';
import Champagne from './components/Champagne';
import DPad from './components/controls/DPad';
import { useGameLoop } from './hooks/useGameLoop';
import { LEVEL, TILE_SIZE, ZOOM_LEVEL } from './constants';
import ControllerButton from './components/controls/ControllerButton';
import PlayerIntro from './components/PlayerIntro';
import Overlay from './components/Overlay';
import ChatForm from './components/ChatForm';
import theme from './theme';


const socket = io(import.meta.env.VITE_BACKEND_URL);

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;

  background: ${(props) => props.theme['background-color-outer']};
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
  const [showChatModal, setShowChatModal] = useState(false);
  const { x, y, direction, isMoving, setManualInput } = useGameLoop();
  const [hasRegistered, setHasRegistered] = useState(false);
  const [playerProfile, setPlayerProfile] = useState({
    playerName: 'Champagne',
    playerColorScheme: 'black',
    playerUniqueID: null,
  });

  // Track all other players. Key = socket.id, Value = player object
  const [players, setPlayers] = useState({});
  const pendingTimeouts = useRef({});

  useEffect(() => {
    // Socket event listeners
    socket.on('init', ({ id, players: initialPlayers }) => {
      console.log('Initialized as player:', id);
      setPlayerProfile((prev) => ({ ...prev, playerUniqueID: id }));

      // Remove ourself from the remote players list so we don't double render
      const { [id]: mySelf, ...others } = initialPlayers;
      setPlayers(others);
    });

    socket.on('playerJoined', (newPlayer) => {
      console.log('Player joined:', newPlayer);
      pendingTimeouts.current[newPlayer.id] = setTimeout(() => {
        setPlayers((prev) => ({
          ...prev,
          [newPlayer.id]: { ...newPlayer, ...prev[newPlayer.id] },
        }));
        delete pendingTimeouts.current[newPlayer.id];
      }, 250);
    });

    socket.on('playerMoved', ({ id, x, y, direction, isMoving }) => {
      setPlayers((prev) => {
        return {
          ...prev,
          [id]: { ...prev[id], id, x, y, direction, isMoving },
        };
      });
    });

    socket.on('chatMessage', ({ id, message }) => {
      console.log('Chat message:', message);
      // setChatMessages((prev) => [...prev, { id, message }]);
    });

    socket.on('playerLeft', ({ id }) => {
      console.log('Player left:', id);
      if (pendingTimeouts.current[id]) {
        clearTimeout(pendingTimeouts.current[id]);
        delete pendingTimeouts.current[id];
      }
      setPlayers((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off('init');
      socket.off('playerJoined');
      socket.off('playerMoved');
      socket.off('playerLeft');
      // Clear any pending join timeouts
      Object.values(pendingTimeouts.current).forEach(clearTimeout);
    };
  }, []);

  // Emit movement updates
  const lastEmittedRef = useRef({ x: -1, y: -1, direction: '', isMoving: false });
  const lastEmitTimeRef = useRef(0);

  useEffect(() => {
    if (!hasRegistered) return;

    const now = Date.now();
    const prev = lastEmittedRef.current;

    // Check if state actually changed
    const hasChanged =
      prev.x !== x ||
      prev.y !== y ||
      prev.direction !== direction ||
      prev.isMoving !== isMoving;

    if (!hasChanged) return;

    // Throttle: emit max once every 50ms, OR if player stopped moving (critical update)
    // We always want to send the "stopped" state immediately so animations stop.
    if (now - lastEmitTimeRef.current > 50 || (prev.isMoving && !isMoving)) {
      socket.emit('move', { x, y, direction, isMoving });
      lastEmittedRef.current = { x, y, direction, isMoving };
      lastEmitTimeRef.current = now;
    }
  }, [x, y, direction, isMoving, hasRegistered]);


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
    // Send to backend
    socket.emit('join', { name, color: colorScheme });

    setPlayerProfile((prev) => ({
      ...prev,
      playerName: name,
      playerColorScheme: colorScheme,
    }));
    setHasRegistered(true);
  };

  const sendMessage = (message) => {
    socket.emit('chatMessage', { message });
  };

  return (
    <ThemeProvider theme={theme}>
      {!hasRegistered ? (
        <PlayerIntro onSubmit={registerPlayer} />
      ) : (
        <GameContainer>
          <div
            style={{
              position: 'fixed',
              top: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              zIndex: 100,
              pointerEvents: 'none', // Let clicks pass through to game if needed
            }}>
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

            {/* Render Remote Players */}
            {Object.values(players)
              .filter((p) => p.name) // Only render if we have their info (from playerJoined delay)
              .map((p) => (
                <Champagne
                  key={p.id}
                  x={p.x}
                  y={p.y}
                  direction={p.direction}
                  isMoving={p.isMoving}
                  playerprofile={{
                    playerName: p.name,
                    playerColorScheme: p.color,
                  }}
                />
              ))}

            {/* Render Local Player */}
            <Champagne
              x={x}
              y={y}
              direction={direction}
              isMoving={isMoving}
              iscurrplayer="true"
              playerprofile={playerProfile}
            />
          </GameArea>
          <DPad onInput={setManualInput} />
          <ControllerButton variant="grab" onClick={() => { }} />
          <ControllerButton variant="chat" onClick={() => { setShowChatModal(true) }} />
          {showChatModal && <Overlay>
            <ChatForm sendMessage={sendMessage} setShowChatModal={setShowChatModal} />
          </Overlay>}
        </GameContainer>
      )}
    </ThemeProvider>
  );
}

export default App;
