import React from 'react';
import Card from 'react-bootstrap/Card';

const RecipeDescription = ({ description, username }) => (
  <Card className="text-center">
    <Card.Body>
      <i>
        {description} - Created by {' '}
        <strong>{username}</strong>
      </i>
    </Card.Body>
  </Card>
);

export default RecipeDescription;
