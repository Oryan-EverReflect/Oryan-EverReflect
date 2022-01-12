import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { useMoralis } from 'react-moralis';
import { Link } from 'react-router-dom';
import logo from '../assets/bankersdream.png';
import LoginModal from './LoginModal.js';

const NavBarTop = () => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();

  useEffect(
    () => {
      if (isAuthenticated) {
        setModalShow(false);
      }
    },
    [ isAuthenticated ]
  );

  const [ modalShow, setModalShow ] = useState(false);

  useEffect(
    () => {
      if (isAuthenticated) {
        setModalShow(false);
      }
    },
    [ isAuthenticated ]
  );

  return (
    <Container fluid>
      <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#193759' }} variant="dark">
        <Container>
          <img src={logo} style={{ width: '100px' }} />
          <Navbar.Brand>EverReflect Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/calculator">
                Calculator
              </Nav.Link>
              <Nav.Link as={Link} to="/swap">
                Swap
              </Nav.Link>
              <Nav.Link href="https://www.everreflect.io">EverReflect</Nav.Link>
            </Nav>
            <Nav>
              <Button
                variant="primary"
                onClick={() => {
                  if (!isAuthenticated) {
                    setModalShow(true);
                  } else {
                    logout();
                  }
                }}
              >
                {!isAuthenticated ? 'Connect Wallet' : 'Logout'}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginModal setModalShow={setModalShow} show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
};

export default NavBarTop;
