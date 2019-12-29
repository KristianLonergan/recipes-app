import React from 'react';
import { Link } from 'react-router-dom';
import classes from './FavouritesList.module.css';

const FavouritesList = ({ favourites }) => (
  <ul className={classes.Favourites}>
    {favourites.map(recipe => {
      return (
        <li key={recipe._id}>
          <Link to={`/recipes/${recipe._id}`}>
            <h4>{recipe.name}</h4>
          </Link>
        </li>
      );
    })}
    {!favourites.length && (
      <p>You have no favourites currently. Go add some!</p>
    )}
  </ul>
);
export default FavouritesList;
