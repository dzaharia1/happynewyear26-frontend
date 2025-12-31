import React, { useState } from 'react';
import styled from 'styled-components';
import Input from './inputs/Input';
import Button from './inputs/Button';
import theme from '../theme';

const ChatFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.lg};
`;

export const ChatForm = ({ sendMessage, setShowChatModal }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.length > 0) {
            sendMessage(message);
            setMessage('');
            setShowChatModal(false);
        }
    };

    return (
        <ChatFormContainer onSubmit={handleSubmit}>
            <Input
                label="Send a message to the party! 32 char at most"
                placeholder=""
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                labelcolor={theme['text-color--base']} />
            <Button type="submit" disabled={message.length === 0}>Send message!</Button>
            <Button type="button" onClick={() => setShowChatModal(false)} variant="secondary">cancel</Button>
        </ChatFormContainer>
    );
};

export default ChatForm;