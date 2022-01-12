import React from 'react';
import { Container } from 'react-bootstrap';
import NavBarTop from './components/nav';
import Routes from './components/Routes';
const App = () => {
  return (
    <Container fluid>
      <NavBarTop />
      <Routes />
    </Container>
  );
};

export default App;
