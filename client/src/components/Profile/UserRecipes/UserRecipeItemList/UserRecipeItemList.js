import React from 'react';
import UserRecipeItem from './UserRecipeItem/UserRecipeItem';

const UserRecipeItemList = ({ recipes, username }) => {
  if (!recipes) return <p>You have not added any recipes</p>;

  return (
    <ul className="list-unstyled">
      {recipes.map(recipe => {
        return (
          <React.Fragment key={recipe._id}>
            <UserRecipeItem username={username} recipe={recipe} />
            <hr />
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default UserRecipeItemList;
