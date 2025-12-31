import React from 'react';
import styled from 'styled-components';
import { LAYER_LEVELS, COLOR_SCHEMES } from '../constants';

const baseBorderWidth = 3;
const LabelContainer = styled.div`
  ${props => props.floating ?
    'position: absolute; transform: translateX(-42%); bottom: calc(100% + 15px); left: 50%;' : 'position: relative;'}

  background-color: ${(props) =>
    COLOR_SCHEMES.find(scheme => scheme.name === props.colorscheme)?.background || '#793F3B'};
  padding: 2px 6px;
  border-style: solid;
  border-width: ${baseBorderWidth}px 0 ${baseBorderWidth * 2}px 0;
  border-color: ${(props) =>
    COLOR_SCHEMES.find(scheme => scheme.name === props.colorscheme)?.border || '#471d1aff'};
  pointer-events: none; // Let clicks pass through to maze if needed

  z-index: ${LAYER_LEVELS.gamertags};

  &::after,
  &::before {
    position: absolute;
    content: '';
    right: 100%;
    top: calc(0px - ${baseBorderWidth}px + 2px);
    height: calc(100% + ${baseBorderWidth * 2}px - 2px);
    width: ${baseBorderWidth}px;
    background-color: ${(props) => COLOR_SCHEMES.find(scheme => scheme.name === props.colorscheme)?.border};
  }

  &::after {
    left: 100%;
  }
`;

const LabelText = styled.p`
    font-family: 'bytesized', sans-serif;
    color: ${(props) =>
    COLOR_SCHEMES.find(scheme => scheme.name === props.colorscheme)?.text || '#c5bfbfff'};
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
`;

const UILabel = ({ colorscheme, text, floating = true }) => {
  return (
    <LabelContainer colorscheme={colorscheme} floating={floating}>
      <LabelText colorscheme={colorscheme}>{text}</LabelText>
    </LabelContainer>
  );
};

export default UILabel;
