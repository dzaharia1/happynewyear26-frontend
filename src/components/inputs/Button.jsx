import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const borderWidth = theme.inputBorderWidth;

const Button = styled.button`
  position: relative;
  cursor: pointer;
  background-color: ${(props) => props.variant === 'secondary' ? props.theme['button-secondary-background'] : props.theme['button-background']};
  color: ${(props) => props.variant === 'secondary' ? props.theme['button-secondary-text'] : props.theme['button-text']};

  border-width: 0 ${borderWidth}px;
  border-color: ${(props) => props.variant === 'secondary' ? props.theme['button-secondary-border-color'] : props.theme['button-border-color']};
  border-style: solid;
  padding: 10px 20px;

  font-family: 'bytesized', sans-serif;
  font-size: 1.5rem;
  text-transform: uppercase;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: ${(props) => props.theme['button-disabled-background']};
    color: ${(props) => props.theme['button-disabled-text']};
    border-color: ${(props) => props.theme['button-disabled-border-color']};

    &:after,
    &:before {
      background-color: ${(props) => props.theme['button-disabled-border-color']};
    }
  }

  &:after,
  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: ${borderWidth}px;

    background-color: ${(props) => props.variant === 'secondary' ? props.theme['button-secondary-border-color'] : props.theme['button-border-color']};
  }

  &:before {
    top: -${borderWidth}px;
  }

  &:after {
    bottom: -${borderWidth}px;
  }
`;

export default Button;
