import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0 2rem 0;
  width: 80%;
  max-width: 500px;
`;

const Label = styled.label`
  margin-bottom: ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme['intro-flow-text-secondary']};
  font-size: 2rem;
  line-height: 2rem;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const StyledInput = styled.div`
  position: relative;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  width: 100%;
  max-width: 500px;

  input {
    border: none;
    border-width: 0 ${(props) => props.theme.inputBorderWidth}px;
    border-color: ${(props) => props.theme['input-border-color']};
    border-style: solid;
    width: 100%;
    padding: 40px 12px;
    font-family: 'bytesized', sans-serif;
    font-size: 2rem;
    background-color: ${(props) => props.theme['input-background']};
    text-align: center;
    text-transform: uppercase;

    &:focus {
      outline: none;
    }
  }
    
  &:after,
  &:before {
      content: '';
      position: absolute;
      left: ${(props) => props.theme.inputBorderWidth}px;
      right: ${(props) => props.theme.inputBorderWidth}px;
      height: ${(props) => props.theme.inputBorderWidth}px;

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

export const InputComponent = ({ label, name, value, placeholder, onChange, labelcolor }) => {
  return (
    <InputContainer>
      <Label htmlFor={name} style={{ color: labelcolor }}>{label}</Label>
      <StyledInput>
        <input type="text" id={name} value={value} onChange={onChange} placeholder={placeholder} />
      </StyledInput>
    </InputContainer>
  );
};

export default InputComponent;
