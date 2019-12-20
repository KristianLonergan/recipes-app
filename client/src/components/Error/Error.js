import React from 'react';
import Alert from 'react-bootstrap/Alert'
import classes from './Error.module.css';

const Error = props => (
  <Alert className={classes.ErrorAlert} variant='danger'>
    {props.error}
  </Alert>
);

export default Error;