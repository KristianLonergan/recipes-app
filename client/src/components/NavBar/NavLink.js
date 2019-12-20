import React from 'react';
import { useHistory } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const NavLink = props => {
  let history = useHistory();

  const clickHandler = () => {
    history.push(props.to);
  };

  return (
    <Nav.Link onClick={clickHandler}>
      {props.label}
    </Nav.Link>
  );
};

export default NavLink;
