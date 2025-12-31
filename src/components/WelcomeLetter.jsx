import React from 'react';
import styled from 'styled-components';
import Button from './inputs/Button';
import { theme } from '../theme';

const WelcomeLetterContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 1rem;
    border-width: 0px 4px;
    border-color: ${(props) => props.theme['button-border-color']};
    border-style: solid;
    margin: 1rem 0;
    gap: 1rem;
    background-color: #D9F3E9;
`;

const TopDecorator = styled.div`
    position: absolute;
    bottom: 99%;
    left: -20px;
    width: calc(100% + 24px);

    display: flex;
    flex-direction: row;
    gap: -1px;

    img {
        width: auto;
        height: 32px;
    }
`;

const BottomDecorator = styled.div`
    position: absolute;
    top: 99%;
    right: -20px;
    width: calc(100% + 42px);

    display: flex;
    flex-direction: row;
    gap: -1px;

    img {
        width: auto;
        height: 32px;
    }
`;

const DecoratorSpan = styled.div`
    flex: 1;
    ${(props) => props.positioning === 'top' && `
        border-width: 4px 0 0 0;
        border-style: solid;
        border-color: ${theme['button-border-color']};
        background-color: #D9F3E9;
    `}
    ${(props) => props.positioning === 'bottom' && `
        border-width: 4px 0;
        border-style: solid;
        border-color: ${theme['button-border-color']};
        background-color: #B4D8CB;
    `}
`;

const Heading = styled.h1`
    font-family: 'Bytesized', sans-serif;
    font-size: 2rem;
    text-transform: uppercase;
    margin-bottom: 1rem;
    color: #729987;
`;

const Content = styled.p`
    font-family: 'bytesized', sans-serif;
    font-size: 1.5rem;
    line-height: 1;
    margin-bottom: 1rem;
    text-transform: uppercase;
    color: ${(props) => props.theme['button-secondary-text']};
`;

const WelcomeLetter = ({ setShowWelcomeLetterModal }) => {
    return (
        <WelcomeLetterContainer>
            <TopDecorator>
                <img src="./lettertop--left.png" />
                <DecoratorSpan positioning="top" />
                <img src="./lettertop--right.png" />
            </TopDecorator>
            <Heading>Hello friend!</Heading>
            <Content>HAPPU NEW YEAR 2026! <br></br><br></br>
                WE WISH YOU FIND HAPPINESS IN THE SMALL THINGS, FEEL EVERY VERSION OF LOVE THAT SURROUNDS YOU, AND CONTINUE TO BE YOUR COOL SELF!
                <br></br><br></br>LOTS OF LOVE,<br></br>Dan and Martha</Content>
            <Button onClick={() => setShowWelcomeLetterModal(false)}>Close</Button>
            <BottomDecorator>
                <img src="./letterbottom--left.png" />
                <DecoratorSpan positioning="bottom" />
                <img src="./letterbottom--right.png" />
            </BottomDecorator>
        </WelcomeLetterContainer>
    );
};

export default WelcomeLetter;
