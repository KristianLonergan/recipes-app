import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Button from 'react-bootstrap/Button';
import { GET_ALL_RECIPES, GET_CURRENT_USER, GET_USER_RECIPES, DELETE_RECIPE } from '../../queries/';

const UserRecipes = ({ username }) => {

  const { data, loading, error } = useQuery(GET_USER_RECIPES, {
    variables: {
      username
    }
  });

  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    update(cache, { data: { deleteUserRecipe } }) {

      const { getUserRecipes } = cache.readQuery({ query: GET_USER_RECIPES, variables: { username } });

      cache.writeQuery({
        query: GET_USER_RECIPES,
        variables: { username },
        data: { getUserRecipes: getUserRecipes.filter(recipe => recipe._id !== deleteUserRecipe._id) },
      });
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  console.log('Users recipes', data);

  const handleDelete = (_id) => {


    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');

    if (confirmDelete) {
      deleteRecipe({
        variables: {
          _id
        },
        refetchQueries: [
          { query: GET_ALL_RECIPES },
          { query: GET_CURRENT_USER }
        ]
      }).then(data => console.log(data));
    }

    
  }

  return (
    <div>
      <h3>Your Recipes</h3>
      {!data.getUserRecipes.length && <p>You have not added any recipes</p>}
      {data.getUserRecipes.map(recipe => {
        return (
          <li key={recipe._id}>
            <Link to={`/recipes/${recipe._id}`}>
              <h4>{recipe.name}</h4>
            </Link>
            <p>Likes: {recipe.likes}</p>
            <Button variant="danger" onClick={() => handleDelete(recipe._id)}>Delete</Button>
          </li>
        );
      })}
    </div>
  );
};

export default UserRecipes;
