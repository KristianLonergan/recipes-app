import React from 'react';
import RecipeItem from './RecipeItem/RecipeItem';

const RecipeItemList = ({ recipes }) => { 

  if (recipes.length === 0) return null;

  return (
    <ul className="list-unstyled">
    <hr />
    {recipes.map(recipe => (
      <React.Fragment key={recipe._id}>
        <RecipeItem key={recipe._id} {...recipe} />
        <hr />
      </React.Fragment>
    ))}
  </ul>
  );
};
  
export default RecipeItemList;
