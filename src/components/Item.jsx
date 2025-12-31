import React from 'react';
import styled from 'styled-components';
import { LAYER_LEVELS } from '../constants';

const itemDimensions = '50px';


const ItemContainer = styled.img`
    position: absolute;
    top: -${itemDimensions};
    left: -${itemDimensions};
    width: ${itemDimensions};
    height: auto;
    z-index: ${LAYER_LEVELS.gamertags};
`;

const Item = (item) => {
    return (
        <ItemContainer src={`pickups/${item}.png`} />
    );
};

export default Item;
