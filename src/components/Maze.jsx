import React from 'react';
import styled from 'styled-components';
import { LEVEL, TILE_SIZE } from '../constants';

const MazeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${LEVEL[0].length}, ${TILE_SIZE}px);
  width: fit-content;
  position: relative;
  border: 4px solid #222;
`;

const Tile = styled.div`
  width: ${TILE_SIZE}px;
  height: ${TILE_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wall = styled(Tile)`
  // background-color: #1919a6; // Classic arcade blue
  border-width: 1px 1px 4px 1px;
  background-image: url('walltiles/wall--${(props) => props.color}.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  box-sizing: border-box;
  border-radius: 4px;
`;

const Floor = styled(Tile)`
  background-color: transparent;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  background-color: #ffb8ae;
  border-radius: 50%;
`;

const Maze = React.memo(() => {
  return (
    <MazeContainer>
      {LEVEL.flat().map((tileType, index) => {
        // 1 is red Wall
        if (tileType === 1) {
          return <Wall key={index} color="red" />;
        }

        if (tileType === 2) {
          return <Wall key={index} color="yellow" />;
        }

        if (tileType === 3) {
          return <Wall key={index} color="tan" />;
        }

        if (tileType === 4) {
          return <Wall key={index} color="blue" />;
        }

        // 2 is Dot
        if (tileType === 5) {
          return (
            <Floor key={index}>
              <Dot />
            </Floor>
          );
        }

        // // 4 is Hot Dog
        // if (tileType === 6) {
        //   return (
        //     <Floor key={index}>
        //       <HotDog />
        //     </Floor>
        //   );
        // }

        // 0 (Empty) and 3 (Start) are just Floor
        return <Floor key={index} />;
      })}
    </MazeContainer>
  );
});

export default Maze;
