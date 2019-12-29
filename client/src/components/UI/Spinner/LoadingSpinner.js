import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import classes from './Spinner.module.css';

const LoadingSpinner = () => <Spinner className={classes.Spinner} animation="border" />;

export default LoadingSpinner;