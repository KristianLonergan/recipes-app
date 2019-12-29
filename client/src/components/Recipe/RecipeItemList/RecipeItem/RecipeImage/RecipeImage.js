import React from 'react';
import Media from 'react-bootstrap/Media';
import { Link } from 'react-router-dom';

const RecipeImage = props => (
  <Media as="li">
    <img
      width={64}
      height={64}
      className="mr-3"
      src={props.imageUrl}
      alt="Recipe"
    />
    <Media.Body>
      <Link to={`/recipes/${props._id}`}>
        <h4>{props.name}</h4>
      </Link>
      <p>{props.description}</p>
    </Media.Body>
  </Media>
);

export default RecipeImage;
