import React from 'react';
import styled from 'styled-components';
import { LAYER_LEVELS } from '../constants';
import UILabel from './UILabel';

const NotificationAreaContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 25%;
    max-width: 300px;
    max-height: 500px;
    overflow-y: hidden;

    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    gap: 4px;
    
    padding: 10px;
    color: white;
    z-index: ${LAYER_LEVELS.controls};
`;

const NotificationArea = (notifications) => {
    return (
        <NotificationAreaContainer>
            {Array.isArray(notifications.notifications) && notifications.notifications.map((notification, index) => (
                <UILabel key={index} text={notification.message} />
            ))}
        </NotificationAreaContainer>
    );
};

export default NotificationArea;

