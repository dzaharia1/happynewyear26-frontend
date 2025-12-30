import React from 'react';
import styled from 'styled-components';
import { LEVEL, TILE_SIZE, LAYER_LEVELS } from '../constants';

const MazeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${LEVEL[0].length}, ${TILE_SIZE}px);
  width: fit-content;
  position: relative;
  background-color: #1919a6;

  &:after {
    // opacity: .5;
    content: "";
    position: absolute;
    top: -${TILE_SIZE}px;
    left: -${TILE_SIZE}px;
    width: calc(100% + ${TILE_SIZE * 2}px);
    height: calc(100% + ${TILE_SIZE * 2}px);
    background-image: url('scenery/mapbackground.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

const Tile = styled.div`
  width: ${TILE_SIZE}px;
  height: ${TILE_SIZE}px;
  display: flex; 
  align-items: center;
  justify-content: center;
`;

const Scenery = styled(Tile)`
  position: relative;
  box-sizing: border-box;
  overflow: visible;

  ${(props) => props.sprite ? `
    &:after {
      content: "";
      position: absolute;

      ${props.sprite === 'diningtable' ? `
        top: -39px;
        left: 0px;
        width: ${TILE_SIZE * 5}px;
        height: ${TILE_SIZE * 3}px;
        background-size: cover;
      ` : ''}

      ${props.sprite === 'kitchenisland' ? `
        top: -33px;
        left: -3px;
        width: ${TILE_SIZE * 7 + 18}px;
        height: ${TILE_SIZE * 3 + 4}px;
        background-size: ${TILE_SIZE * 7 + 18}px;
      ` : ''}

      ${props.sprite === 'kitchencounter' ? `
        top: -15px;
        left: 0;
        width: ${TILE_SIZE * 7}px;
        height: ${TILE_SIZE * 2 + 27}px;
        background-size: ${TILE_SIZE * 7}px;
      ` : ''}

      ${props.sprite === 'couch' ? `
        top: -12px;
        left: -12px;
        width: ${TILE_SIZE * 2 + 15}px;
        height: ${(TILE_SIZE * 6) - 3}px;
        background-size: cover;
      ` : ''}

      ${props.sprite === 'figtree' ? `
        bottom: 0;
        left: -15px;
        width: ${TILE_SIZE + 24}px;
        height: ${(TILE_SIZE * 2) - 3}px;
        background-size: cover;
      ` : ''}

      ${props.sprite === 'coffeetable' ? `
        top: -12px;
        left: 0;
        width: ${TILE_SIZE * 2}px;
        height: ${(TILE_SIZE * 3) - 33}px;
        background-size: cover;
      ` : ''}

      ${props.sprite === 'buffet' ? `
        // opacity: .5;
        top: -12px;
        left: 0;
        width: ${(TILE_SIZE * 2) + 6}px;
        height: ${(TILE_SIZE * 4) + 12}px;
        background-size: cover;
      ` : ''}

      ${props.sprite === 'wassily' ? `
        top: -9px;
        left: 0;
        width: ${TILE_SIZE * 2}px;
        height: ${TILE_SIZE * 2}px;
        background-size: contain;
      ` : ''}

      background-image: url('scenery/${props.sprite}--top.png');
      background-repeat: no-repeat;
      z-index: ${LAYER_LEVELS.furniture};
    }
  ` : ''}
`;

const Floor = styled(Tile)`
  background-color: transparent;
`;

const Dot = styled.div`
width: 6px;
height: 6px;
background - color: #ffb8ae;
border - radius: 50 %;
`;

const Maze = React.memo(() => {
  return (
    <MazeContainer>
      {LEVEL.flat().map((tileType, index) => {
        // 1 is red Wall
        if (tileType === 0) {
          return <Scenery key={index} />;
        } else if (tileType != 0 && tileType != 1) {
          return <Scenery key={index} sprite={tileType} />;
        } else {
          return <Floor key={index} />;
        }
      })}
    </MazeContainer>
  );
});

export default Maze;
