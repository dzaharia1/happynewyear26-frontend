import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  margin-bottom: 8px;
  color: ${(props) => props.theme['text-color--base']};
  font-size: 2rem;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const InputComponent = ({ label, name, value, onChange }) => {
  return (
    <InputContainer>
      <Label htmlFor={name}>{label}</Label>
      <Input type="text" id={name} value={value} onChange={onChange} />
    </InputContainer>
  );
};

export default InputComponent;
