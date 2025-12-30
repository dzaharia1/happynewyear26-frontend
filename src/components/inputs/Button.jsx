import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => props.theme['background-color--base']};
  color: ${(props) => props.theme['text-color--base']};
  border: none;
  cursor: pointer;
`;

export default Button;
