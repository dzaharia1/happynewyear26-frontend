import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import { LAYER_LEVELS } from '../../constants';

const ControllerButtonItself = styled.button`
    position: fixed;
    right: 30px;
    bottom: ${(props) => props.variant === 'chat' ? '38px' : '112px'};
  background-color: ${theme['button-background']};
  color: ${theme['button-text-color']};
  border: none;
  width: 150px;
  height: 60px;
  cursor: pointer;
  transition: border .2s ease-out, transform .2s ease-out;
  border-bottom-width: 2px;

  background: url(${(props) => props.variant === 'chat' ? 'chatbutton.png' : 'grabbutton.png'}) no-repeat top left;
  background-size: contain;

  z-index: ${LAYER_LEVELS.controls};

  &:hover {
    transform: translateY(-2px);
    border-bottom-width: 3px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ControllerButton = ({ onClick, variant, disabled }) => {
  return (
    <ControllerButtonItself onClick={onClick} variant={variant} disabled={disabled}>

    </ControllerButtonItself>
  );
};

export default ControllerButton;
