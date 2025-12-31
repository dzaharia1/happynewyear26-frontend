import React, { useState, useEffect, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { io } from 'socket.io-client';
import Maze from './components/Maze';
import Champagne from './components/Champagne';
import DPad from './components/controls/DPad';
import { useGameLoop } from './hooks/useGameLoop';
import { LEVEL, TILE_SIZE, ZOOM_LEVEL, ITEMLOCATIONS, PICKUP_THRESHOLD } from './constants';
import ControllerButton from './components/controls/ControllerButton';
import PlayerIntro from './components/PlayerIntro';
import Overlay from './components/Overlay';
import ChatForm from './components/ChatForm';
import NotificationArea from './components/NotificationArea';
import WelcomeLetter from './components/WelcomeLetter';
import PickupObjectIndicator from './components/PickupObjectIndicator';
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

  -webkit-user-select: none;
  user-select: none;
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
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  color: #c8c8c8ff;
  font-size: 0.9rem;
`;

function App() {
  const [showChatModal, setShowChatModal] = useState(false);
  const [showWelcomeLetterModal, setShowWelcomeLetterModal] = useState(false);
  const { x, y, direction, isMoving, setManualInput } = useGameLoop();
  const [hasRegistered, setHasRegistered] = useState(false);
  const [playerProfile, setPlayerProfile] = useState({
    playerName: 'Champagne',
    playerColorScheme: 'black',
    playerUniqueID: null,
    chatmessage: null,
    chatTimestamp: null,
  });

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      message: 'Welcome to the party!',
      timestamp: Date.now(),
    }
  ]);

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
        const truncatedPlayerName = newPlayer.name.slice(0, 7);
        setNotifications((prev) => [...prev, { id: newPlayer.id, message: `${truncatedPlayerName} joined`, timestamp: Date.now() }]);
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
      console.log('Chat message:', message, 'from', id);
      const ts = Date.now();

      // If it's us
      if (id === socket.id) {
        setPlayerProfile((prev) => ({ ...prev, chatmessage: message, chatTimestamp: ts }));
      } else {
        // It's someone else
        setPlayers((prev) => {
          // Use functional update to ensure we don't lose key if player doesn't exist yet (though they should)
          if (!prev[id]) return prev;
          return {
            ...prev,
            [id]: { ...prev[id], chatmessage: message, chatTimestamp: ts }
          }
        });
      }
    });

    socket.on('playerLeft', ({ id, name }) => {
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
      setNotifications((prev) => [...prev, { id, message: `${name} left`, timestamp: Date.now() }]);
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
    socket.emit('chatMessage', message);
  };

  // Check for nearby pickup items
  const activeItem = React.useMemo(() => {
    let closestItem = null;
    let minDistance = Infinity;

    // Player center logic matches the one used for camera centering
    const pCenterX = x + TILE_SIZE / 2;
    const pCenterY = y + TILE_SIZE / 2;

    for (let r = 0; r < ITEMLOCATIONS.length; r++) {
      for (let c = 0; c < ITEMLOCATIONS[r].length; c++) {
        const item = ITEMLOCATIONS[r][c];
        if (item !== 0) {
          const itemCenterX = c * TILE_SIZE + TILE_SIZE / 2;
          const itemCenterY = r * TILE_SIZE + TILE_SIZE / 2;

          const dist = Math.sqrt(
            Math.pow(pCenterX - itemCenterX, 2) + Math.pow(pCenterY - itemCenterY, 2)
          );

          if (dist < PICKUP_THRESHOLD && dist < minDistance) {
            minDistance = dist;
            closestItem = { r, c, type: item, x: c * TILE_SIZE, y: r * TILE_SIZE };
          }
        }
      }
    }
    return closestItem;
  }, [x, y]);

  const interactWithItem = (item) => {
    console.log('Interacting with item:', item);
    if (item === 'welcomeletter') {
      setShowWelcomeLetterModal(true);
    }
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
                  chatmessage={p.chatmessage}
                  chatTimestamp={p.chatTimestamp}
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
              chatmessage={playerProfile.chatmessage}
              chatTimestamp={playerProfile.chatTimestamp}
            />
            {activeItem && (
              <PickupObjectIndicator x={activeItem.x} y={activeItem.y} />
            )}
          </GameArea>
          <DPad onInput={setManualInput} />
          <ControllerButton
            variant="grab"
            disabled={!activeItem}
            onClick={() => {
              if (activeItem) {
                console.log('Grabbed item:', activeItem);
                interactWithItem(activeItem.type);
              }
            }}
          />
          <ControllerButton variant="chat" onClick={() => { setShowChatModal(true) }} />
          {showChatModal && <Overlay>
            <ChatForm sendMessage={sendMessage} setShowChatModal={setShowChatModal} />
          </Overlay>}
          {showWelcomeLetterModal && <Overlay>
            <WelcomeLetter setShowWelcomeLetterModal={setShowWelcomeLetterModal} />
          </Overlay>}
          {/* <NotificationArea notifications={notifications} /> */}
        </GameContainer>
      )}
    </ThemeProvider>
  );
}

export default App;
