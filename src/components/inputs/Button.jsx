import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => props.theme['button-background']};
  color: ${(props) => props.theme['button-text']};
  border: none;
  cursor: pointer;
`;

export default Button;
