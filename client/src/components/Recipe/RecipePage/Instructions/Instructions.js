import React from 'react';

const Instructions = ({ instructions }) => (
  <>
    <h2 className="pt-md-5">Instructions</h2>
    <p dangerouslySetInnerHTML={{ __html: instructions }}></p>
  </>
);

export default Instructions;
