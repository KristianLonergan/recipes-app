import React from 'react';

const Heading = React.memo(({ label, namespaces }) => {

  const classes = ["text-center", namespaces];

  return <h1 className={classes.join(' ')}>{label}</h1>
});

export default Heading;