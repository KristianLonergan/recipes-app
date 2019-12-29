import React from 'react';

const Heading = ({ label, namespaces }) => {

  const classes = ["text-center", namespaces];

  return <h1 className={classes.join(' ')}>{label}</h1>
};

export default Heading;