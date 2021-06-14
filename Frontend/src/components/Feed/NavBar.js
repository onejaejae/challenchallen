import React from 'react';
import styled from 'styled-components';
import {NavLink} from "react-router-dom";

const navMenu = [
    {
        link: '/challenge/all',
        text: '전체'
    },
    {
        link: "/challenge/electricity",
        text: '전기 부문'
    },
    {
        link: "/challenge/traffic",
        text: '교통 부문'
    },
    {
        link: "/challenge/airCondition",
        text: '냉난방 부문'
    },
    {
        link: "/challenge/resource",
        text: '자원 부문'
    },

]

function NavBar() {
    return (
        <NavBarContainer className="nav">
            {navMenu.map(({link, text}) =>
                <StyledLink activeClassName="active" to={link} key={text}>
                    {text}
                </StyledLink>)
            }
        </NavBarContainer>
    );
}

const NavBarContainer = styled.div`
margin-top: 2vh;
text-align: center;
width: 100%;
`;
const StyledLink = styled(NavLink)`
  text-decoration: none;
  font-weight: 600;
  color: black;
  :hover {
     color: #40804F;
  }
  margin:8px;
 font-size: 0.8rem;
`;


export default NavBar;