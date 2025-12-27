export const TILE_SIZE = 50; // pixels
export const PLAYER_SPEED = 2; // pixels per frame (must be a divisor of TILE_SIZE for smooth grid alignment)
export const PLAYER_COLLISION_BUFFER = 5; // pixels to inset from the tile edges for collision detection

// 0 = empty floor
// 1 = red wall
// 2 = yellow wall
// 3 = tan wall
// 4 = blue wall
// 5 = dot (pickup)
// 6 = player start
export const LEVEL = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 5, 5, 5, 5, 5, 1, 5, 5, 5, 5, 5, 5, 5, 1],
  [1, 5, 1, 1, 1, 5, 1, 5, 1, 1, 1, 1, 1, 5, 1],
  [1, 5, 1, 0, 0, 5, 5, 5, 0, 0, 1, 0, 0, 5, 1],
  [1, 5, 1, 5, 1, 1, 0, 1, 1, 5, 1, 5, 1, 5, 1],
  [1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1],
  [1, 5, 1, 1, 1, 5, 1, 5, 1, 1, 1, 5, 1, 5, 1],
  [1, 5, 5, 5, 1, 5, 1, 5, 1, 5, 5, 5, 1, 5, 1],
  [1, 1, 1, 5, 1, 5, 1, 5, 1, 5, 1, 1, 1, 5, 1],
  [1, 0, 0, 5, 5, 5, 'startpos', 5, 5, 5, 0, 0, 0, 5, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
