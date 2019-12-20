import React from 'react';
import { Link } from 'react-router-dom';

const RecipeItem = props => (
  <li>
    <Link to={`/recipes/${props._id}`}>
      <h4>{props.name}</h4>
    </Link>
    <p>{props.category}</p>
  </li>
);

export default RecipeItem;
