import React from 'react';
import NavLink from './NavLink';
import SignOut from '../SignOut';
import { useHistory } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import ButtonLink from '../UI/Button/ButtonLink';
import classes from './NavBar.module.css'

const NavBar = ({ session }) => {
  let history = useHistory();

  let navItems;

  if (session && session.getCurrentUser) {
    navItems = (
      <React.Fragment>
        <Nav className="mr-auto">
        <NavLink label="Home" to="/" />
        <NavLink label="Search" to="/search" />
        <NavLink label="Add Recipe" to="/recipe/add" />
        <NavLink label="Profile" to="/profile" />
      </Nav>

      <Nav>
        <SignOut />
      </Nav>
      </React.Fragment>
    );
  } else {
    navItems = (
      <React.Fragment>
        <Nav className="mr-auto" />

        <Nav>
          <NavLink label="Home" to="/" />
          <NavLink label="Search" to="/search" />
          <ButtonLink path="/signin" label="Sign In" />
        </Nav>
      </React.Fragment>
    );
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand className={classes.HomeIcon} onClick={() => history.push('/')}>
        <i className="fas fa-utensils"></i> Recipes
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">{navItems}</Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
