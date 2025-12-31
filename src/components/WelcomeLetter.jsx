import React from 'react';
import styled from 'styled-components';
import Button from './inputs/Button';

const WelcomeLetterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

const Heading = styled.h1`
    font-family: 'Pixelify Sans', sans-serif;
    font-size: 2rem;
    margin-bottom: 1rem;
`;

const Content = styled.p`
    font-family: 'Pixelify Sans', sans-serif;
    margin-bottom: 1rem;
`;

const WelcomeLetter = ({ setShowWelcomeLetterModal }) => {
    return (
        <WelcomeLetterContainer>
            <Heading>Letter heading</Heading>
            <Content>Letter content</Content>
            <Button onClick={() => setShowWelcomeLetterModal(false)}>Close</Button>
        </WelcomeLetterContainer>
    );
};

export default WelcomeLetter;
