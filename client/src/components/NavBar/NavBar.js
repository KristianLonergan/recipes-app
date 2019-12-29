import React, { useContext } from 'react';
import NavLink from './NavLink';
import SignOut from '../SignOut/SignOut';
import { useHistory } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import ButtonLink from '../UI/Button/ButtonLink';
import { SessionContext } from '../../context/session';
import classes from './NavBar.module.css';

const NavBar = () => {
  
  let navItems;
  let history = useHistory();
  const sessionContext = useContext(SessionContext);

  if (sessionContext.currentUser) {
    navItems = (
      <>
        <Nav className="mr-auto">
          <NavLink label="Home" to="/" />
          <NavLink label="Search" to="/search" />
          <NavLink label="Add Recipe" to="/recipe/add" />
          <NavLink label="Profile" to="/profile" />
        </Nav>

        <Nav>
          <SignOut />
        </Nav>
      </>
    );
  } else {
    navItems = (
      <>
        <Nav className="mr-auto">
          <NavLink label="Home" to="/" />
          <NavLink label="Search" to="/search" />
        </Nav>

        <Nav>
          <ButtonLink path="/signin" label="Sign In" />
        </Nav>
      </>
    );
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand
        className={classes.HomeIcon}
        onClick={() => history.push('/')}
      >
        <i className="fas fa-utensils"></i> Recipes
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">{navItems}</Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
