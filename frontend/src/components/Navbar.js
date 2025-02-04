import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Fintech Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/users">
              <Nav.Link>Users</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/transactions">
              <Nav.Link>Transactions</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/accounts">
              <Nav.Link>Accounts</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
