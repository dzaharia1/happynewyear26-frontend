import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0 2rem 0;
`;

const Label = styled.label`
  margin-bottom: ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme['intro-flow-text-secondary']};
  font-size: 2rem;
  text-transform: uppercase;
  width: 100%;
  max-width: 500px;
  text-align: center;
  margin-bottom: 2rem;
`;

const StyledInput = styled.div`
  position: relative;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  input {
    border: none;
    border-width: 0 ${theme.inputBorderWidth * 2}px;
    border-color: #F3BA83;
    border-style: solid;
    padding: 40px 60px;
    font-family: 'bytesized', sans-serif;
    font-size: 2rem;
    background-color: #FDF5EC;
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
      left: ${theme.inputBorderWidth}px;
      right: ${theme.inputBorderWidth}px;
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

export const InputComponent = ({ label, name, value, onChange }) => {
  return (
    <InputContainer>
      <Label htmlFor={name}>{label}</Label>
      <StyledInput>
        <input type="text" id={name} value={value} onChange={onChange} placeholder="Like 'Dan' or 'Martha'" />
      </StyledInput>
    </InputContainer>
  );
};

export default InputComponent;
