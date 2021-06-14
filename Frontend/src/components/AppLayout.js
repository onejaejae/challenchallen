import React from 'react';
import styled from "styled-components";
import Header from './Header';
import Footer from './Footer';

const AppLayout = ({ children }) => (

    <Container>
        <Header />
        <div>{children}</div>
        <Footer />
    </Container>

);
const Pc = styled.div`
 
`;

const Container = styled.div`
  background-color: white;
  margin: 0 auto;
  width: 420px;
   @media all and (max-width: 420px) { 
    width: 100%;
   }
`;

export default AppLayout;