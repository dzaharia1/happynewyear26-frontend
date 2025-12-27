import { useRef, useState, useEffect } from 'react';
import { LEVEL, TILE_SIZE, PLAYER_SPEED } from '../constants';

export const useGameLoop = () => {
  // Find start position
  const startRow = LEVEL.findIndex(row => row.includes(3));
  const startCol = LEVEL[startRow].indexOf(3);
  
  const startX = startCol * TILE_SIZE;
  const startY = startRow * TILE_SIZE;

  const posRef = useRef({ x: startX, y: startY });
  const [renderPos, setRenderPos] = useState({ x: startX, y: startY });
  
  // Track inputs
  const currentInputRef = useRef({ x: 0, y: 0 }); // Intended direction
  const lastInputRef = useRef({ x: 0, y: 0 });    // Last valid move direction
  
  // Animation state for sprites
  const [direction, setDirection] = useState('down'); // 'up', 'down', 'left', 'right'
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          currentInputRef.current = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          currentInputRef.current = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          currentInputRef.current = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          currentInputRef.current = { x: 1, y: 0 };
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      // Optional: Stop moving if the key released matches current direction?
      // For Pac-Man style, we usually keep moving until a wall or new input.
      // But for standard RPG movement, we stop.
      // The user said "use their arrow keys... to navigate", implying continuous hold or toggle.
      // Let's stick to: if key released, stop input IF it was the active one.
      // Actually, let's implement continuous movement while key is held for now, 
      // as it's safer for a first pass than auto-move.
      
      // Simple WASD/Arrow release check
      if (
        (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') && currentInputRef.current.y === -1 ||
        (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') && currentInputRef.current.y === 1 ||
        (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && currentInputRef.current.x === -1 ||
        (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && currentInputRef.current.x === 1
      ) {
        currentInputRef.current = { x: 0, y: 0 };
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    let animationFrameId;

    const loop = () => {
      const { x, y } = posRef.current;
      const { x: dx, y: dy } = currentInputRef.current;

      let nextX = x + dx * PLAYER_SPEED;
      let nextY = y + dy * PLAYER_SPEED;

      // Collision Detection
      // We check the four corners of the player's bounding box against the grid
      // Player is TILE_SIZE x TILE_SIZE
      // A slight buffer allows sliding through gaps easier
      const buffer = 8; 
      
      const checkCollision = (checkX, checkY) => {
        // Get grid indices for top-left, top-right, bottom-left, bottom-right
        const leftCol = Math.floor((checkX + buffer) / TILE_SIZE);
        const rightCol = Math.floor((checkX + TILE_SIZE - buffer) / TILE_SIZE);
        const topRow = Math.floor((checkY + buffer) / TILE_SIZE);
        const bottomRow = Math.floor((checkY + TILE_SIZE - buffer) / TILE_SIZE);

        // Check if any of these tiles are walls (1)
        // We need to handle out of bounds too
        if (
          topRow < 0 || leftCol < 0 || 
          bottomRow >= LEVEL.length || rightCol >= LEVEL[0].length
        ) {
          return true; // Out of bounds is a collision
        }

        const topLeft = LEVEL[topRow][leftCol] === 1;
        const topRight = LEVEL[topRow][rightCol] === 1;
        const bottomLeft = LEVEL[bottomRow][leftCol] === 1;
        const bottomRight = LEVEL[bottomRow][rightCol] === 1;

        return topLeft || topRight || bottomLeft || bottomRight;
      };

      if (!checkCollision(nextX, y) && dx !== 0) {
        posRef.current.x = nextX;
        setDirection(dx > 0 ? 'right' : 'left');
        setIsMoving(true);
      } else if (!checkCollision(x, nextY) && dy !== 0) {
        posRef.current.y = nextY;
        setDirection(dy > 0 ? 'down' : 'up');
        setIsMoving(true);
      } else {
        setIsMoving(false);
      }

      // Update render state
      // We only update React state if position changed to avoid unnecessary renders if idle?
      // Actually, for 60fps game loop, we usually sync every frame if moving.
      // But if not moving, we can skip.
      if (posRef.current.x !== renderPos.x || posRef.current.y !== renderPos.y) {
        setRenderPos({ x: posRef.current.x, y: posRef.current.y });
      }

      animationFrameId = window.requestAnimationFrame(loop);
    };

    loop();
    return () => window.cancelAnimationFrame(animationFrameId);
  }, []); // Dependency on renderPos might cause re-creation of loop? 
  // Better: No dependency, use refs for everything inside.
  // But we need 'renderPos' in dependency if we were reading it, but we read posRef.
  // So [] is fine, or better yet, remove the dependency on renderPos in the effect.
  
  const setManualInput = (input) => {
    currentInputRef.current = input;
  };

  return { 
    x: renderPos.x, 
    y: renderPos.y,
    direction,
    isMoving,
    setManualInput
  };
};
