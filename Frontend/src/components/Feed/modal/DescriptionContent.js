import React from 'react';
import styled from 'styled-components'

function DescriptionContent({title,array}) {
    return (
        <div>
            <Title>{title}</Title>
            <List>
            {array.map((item)=><li key={item}>✔ {item}</li>)}
            </List>
        </div>
    );
}

const Title = styled.div`
margin: 4vh 0 2vh 0;
font-weight: bold;
`;

const List = styled.ul`
line-height: 25px;
`;
export default DescriptionContent;