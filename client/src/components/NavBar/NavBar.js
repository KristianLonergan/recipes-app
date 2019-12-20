import React from 'react';
import NavLink from './NavLink';
import SignOut from '../SignOut';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = ({session}) => {

  return session && session.getCurrentUser ? <NavBarAuth /> : <NavBarUnAuth /> 

};

const NavBarUnAuth = () => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand>
      <i className="fas fa-utensils"></i> Recipes
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <NavLink label="Home" to="/" />
        <NavLink label="Search" to="/search" />
      </Nav>

      <Nav>
        <NavLink label="Sign In" to="/signin" />
        <NavLink label="Sign Up" to="/signup" />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const NavBarAuth = () => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand>
      <i className="fas fa-utensils"></i> Recipes
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <NavLink label="Home" to="/" />
        <NavLink label="Search" to="/search" />
        <NavLink label="Add Recipe" to="/recipe/add" />
        <NavLink label="Profile" to="/profile" />
      </Nav>

      <Nav>
        <SignOut />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavBar;
