import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Overlay from './Overlay';
// import Button from './inputs/Button';
import Input from './inputs/Input';
import { TILE_SIZE } from '../constants';
import { theme } from '../theme';

const colorOptions = ['blue', 'brown', 'green', 'orange', 'red'];

const COLOR_SCHEMES = [
  { name: 'brown', background: '#793F3B', border: '#471d1a' },
  { name: 'blue', background: '#3B5F79', border: '#1a2f47' },
  { name: 'green', background: '#3B7950', border: '#1a4728' },
  { name: 'orange', background: '#79593B', border: '#47311a' },
  { name: 'red', background: '#793B3B', border: '#471a1a' },
];

const PlayerIntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.lg};
`;

const TitleBlast = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
`;

const Label = styled.p`
  margin-bottom: -${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme['text-color--base']};
  font-size: 2rem;
`;

const CatSampleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.spacing.xl};
`;

const CatSample = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

const baseBorderWidth = 3;
const CatSampleTag = styled.div`
  position: relative;
  color: white;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;

  background-color: ${(props) =>
    COLOR_SCHEMES[props.colorscheme].background || '#793F3B'};
  padding: 2px 6px;
  border-style: solid;
  border-width: ${baseBorderWidth}px 0 ${baseBorderWidth * 2}px 0;
  border-color: ${(props) =>
    COLOR_SCHEMES[props.colorscheme].border || '#471d1aff'};
  pointer-events: none; // Let clicks pass through to maze if needed

  z-index: 10;

  &::after,
  &::before {
    position: absolute;
    content: '';
    right: 100%;
    top: calc(0px - ${baseBorderWidth}px + 2px);
    height: calc(100% + ${baseBorderWidth * 2}px - 2px);
    width: ${baseBorderWidth}px;
    background-color: ${(props) => COLOR_SCHEMES[props.colorscheme].border};
  }

  &::after {
    left: 100%;
  }
`;

const CatSampleImage = styled.img`
  width: ${TILE_SIZE * 2}px;
  height: auto;
`;

const ColorSchemeSelectorArrow = styled.button`
  background: none;
  border: none;
  font-family: 'Bytesized';
  font-size: 3rem;
  cursor: pointer;
  color: ${(props) => props.theme['text-color--base']};
`;

export const PlayerIntro = ({ onSubmit }) => {
  const nameInputRef = useRef();
  const [playerName, setPlayerName] = useState('');
  const [colorSchemeChoice, setColorSchemeChoice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameInputRef.current.value;
    onSubmit(name, COLOR_SCHEMES[colorSchemeChoice].name);
  };

  return (
    <Overlay title="Configure your player">
      <PlayerIntroContainer>
        <TitleBlast src="./titleblast.png" />
        <Input
          label="What is your name?"
          name="name"
          ref={nameInputRef}
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name"
          required
        />
        <Label>What color do you want to be?</Label>
        <CatSampleContainer>
          <ColorSchemeSelectorArrow
            onClick={() =>
              setColorSchemeChoice(
                (prev) =>
                  (prev - 1 + COLOR_SCHEMES.length) % COLOR_SCHEMES.length,
              )
            }>
            prev
          </ColorSchemeSelectorArrow>
          <CatSample>
            <CatSampleTag colorscheme={colorSchemeChoice}>
              {playerName || 'You'}
            </CatSampleTag>
            <CatSampleImage
              src={`./champagne/${COLOR_SCHEMES[colorSchemeChoice].name}/right0.png`}
            />
          </CatSample>
          <ColorSchemeSelectorArrow
            onClick={() =>
              setColorSchemeChoice(
                (prev) =>
                  (prev + 1 + COLOR_SCHEMES.length) % COLOR_SCHEMES.length,
              )
            }>
            next
          </ColorSchemeSelectorArrow>
        </CatSampleContainer>
      </PlayerIntroContainer>
    </Overlay>
  );
};

export default PlayerIntro;
