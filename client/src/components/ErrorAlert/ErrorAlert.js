import React from 'react';
import Alert from 'react-bootstrap/Alert'
import classes from './ErrorAlert.module.css';

const ErrorAlert = props => (
  <Alert className={classes.ErrorAlert} variant='danger'>
    {props.error}
  </Alert>
);

export default ErrorAlert;