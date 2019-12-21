import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const ButtonLink = ({path, label}) => {

  let history = useHistory();
  
  const handleOnClick = () => {
    history.push(path);
  }

  return (
    <Button variant="outline-light" onClick={handleOnClick}>{label}</Button>
  );
}

export default ButtonLink;