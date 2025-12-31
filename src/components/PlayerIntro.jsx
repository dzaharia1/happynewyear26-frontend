import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Button from './inputs/Button';
import Input from './inputs/Input';
import UILabel from './UILabel';
import { TILE_SIZE, COLOR_SCHEMES } from '../constants';
import { theme } from '../theme';

const colorOptions = ['blue', 'brown', 'green', 'orange', 'red'];

// const COLOR_SCHEMES = [
//   { name: 'brown', background: '#793F3B', border: '#471d1a' },
//   { name: 'blue', background: '#3B5F79', border: '#1a2f47' },
//   { name: 'green', background: '#3B7950', border: '#1a4728' },
//   { name: 'orange', background: '#79593B', border: '#47311a' },
//   { name: 'red', background: '#793B3B', border: '#471a1a' },
// ];

const PlayerIntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  // gap: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme['intro-flow-background']};
`;

const IntroBlast = styled.img`
  width: 90%;
  max-width: 500px;
  height: auto;
  margin-bottom: 2rem;
`;

const IntroText = styled.h3`
  color: ${(props) => props.theme['intro-flow-text-secondary']};
  font-size: 2rem;
  font-family: 'bytesized', sans-serif;
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 2rem 0;
  width: 90%;
  // max-width: 500px;
`;

// const Title = styled.h1`
//   color: ${(props) => props.theme['intro-flow-text']};
//   font-size: 3rem;
//   font-family: 'pixelify sans', sans-serif;
//   text-transform: uppercase;
//   text-align: center;
//   font-size: 3rem;
//   margin: 0 0 -.5rem 0;
//   width: 90%;
//   max-width: 500px;

//   @media (min-width: 768px) {
//     font-size: 5rem;
//   }
// `;

// const SubTitle = styled.h3`
//   color: ${(props) => props.theme['intro-flow-text']};
//   font-size: 2rem;
//   font-family: 'pixelify sans', sans-serif;
//   font-size: 2.5rem;
//   text-transform: uppercase;
//   text-align: center;
//   margin: 0 0 4rem 0;

//   @media (min-width: 768px) {
//     font-size: 3rem;
//   }
// `;

const Label = styled.p`
  margin-bottom: -${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme['intro-flow-text-secondary']};
  font-size: 2rem;
  font-family: 'bytesized', sans-serif;
  text-transform: uppercase;
  margin-bottom: ${(props) => props.theme.spacing.xxl};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  width: 90%;
  max-width: 500px;
`;

const CatSampleContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.xxl};

  width: 90%;
  max-width: 500px;
`;

const CatSample = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};

  background-color: ${(props) => props.theme['input-background']};
  padding: ${(props) => props.theme.spacing.lg} ${(props) => props.theme.spacing.xxl};
  border-width: 0 ${(props) => props.theme.inputBorderWidth}px;
  border-color: ${(props) => props.theme['input-border-color']};
  border-style: solid;
    
  &:after,
  &:before {
    content: '';
    position: absolute;
    left: 0px;
    right: 0px;
    height: ${theme.inputBorderWidth}px;

    background-color: ${(props) => props.theme['input-border-color']};
  }

  &:before {
    top: -${theme.inputBorderWidth}px;
  }

  &:after {
    bottom: -${theme.inputBorderWidth}px;
  }
  }
`;

const CatSampleImage = styled.img`
  width: ${TILE_SIZE * 2}px;
  height: auto;
`;

const ColorSchemeSelectorArrow = styled.button`
  background-image: ${(props) => props.direction === 'left' ? `url('leftarrow.png')` : `url('rightarrow.png')`};
  background-size: cover;
  background-position: center;
  background-color: transparent;
  border: none;
  font-family: 'Bytesized';
  font-size: 3rem;
  cursor: pointer;
  color: ${(props) => props.theme['text-color--base']};
  width: 90px;
  height: 90px;
`;

export const PlayerIntro = ({ onSubmit }) => {
  const [playerName, setPlayerName] = useState('');
  const [colorSchemeChoice, setColorSchemeChoice] = useState(0);
  const [introStep, setIntroStep] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(playerName, COLOR_SCHEMES[colorSchemeChoice].name);
  };

  return (
    <PlayerIntroContainer>
      {introStep === 0 && (
        <>
          <IntroText>You have been cordially invited to</IntroText>
          <IntroBlast src="titlecard.png" />
          <Button onClick={() => setIntroStep(1)}>Get Started</Button>
        </>
      )}
      {introStep === 1 && (
        <>
          <Input
            label="What's your name?"
            name="name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="like 'Martha' or 'Dan'"
            required
          />
          <Button onClick={() => setIntroStep(2)} disabled={playerName === ''}>Next</Button>
        </>
      )}
      {introStep === 2 && (
        <>
          <Label>Which cat are you?</Label>
          <CatSampleContainer>
            <ColorSchemeSelectorArrow
              onClick={() =>
                setColorSchemeChoice(
                  (prev) =>
                    (prev - 1 + COLOR_SCHEMES.length) % COLOR_SCHEMES.length,
                )
              }
              direction="left" />
            <CatSample>
              <UILabel colorscheme={COLOR_SCHEMES[colorSchemeChoice].name} text={playerName || 'You'} floating={false} />
              <CatSampleImage
                src={`./champagne/${COLOR_SCHEMES[colorSchemeChoice].name}/right0.png`}
              />
            </CatSample >
            <ColorSchemeSelectorArrow
              onClick={() =>
                setColorSchemeChoice(
                  (prev) =>
                    (prev + 1 + COLOR_SCHEMES.length) % COLOR_SCHEMES.length,
                )
              }
              direction="right" />
          </CatSampleContainer >
          <ButtonContainer>
            <Button type="submit" variant="secondary" onClick={() => setIntroStep(1)}>Back</Button>
            <Button type="submit" onClick={handleSubmit}>Join the party!</Button>
          </ButtonContainer>
        </>
      )}
    </PlayerIntroContainer >
  );
};

export default PlayerIntro;
