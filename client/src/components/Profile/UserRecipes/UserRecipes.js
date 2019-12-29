import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { useQuery } from '@apollo/react-hooks';
import UserRecipeItemList from './UserRecipeItemList/UserRecipeItemList';
import { GET_USER_RECIPES } from '../../../queries';
import { SessionContext } from '../../../context/session';

const UserRecipes = () => {

  const { currentUser } = useContext(SessionContext);
  const username = currentUser.username;
  const { data, loading, error } = useQuery(GET_USER_RECIPES, {
    variables: {
      username
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div className="pt-md-5">
      <Card>
        <Card.Header>
          <h1>Your Recipes</h1>
        </Card.Header>
        <Card.Body>
          <UserRecipeItemList recipes={data.getUserRecipes} username={username}/>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserRecipes;
