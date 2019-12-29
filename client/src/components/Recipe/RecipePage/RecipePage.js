import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import Container from 'react-bootstrap/Container';
import Heading from '../../UI/Heading/Heading';
import LikeRecipe from '../LikeRecipe/LikeRecipe';
import Instructions from './Instructions/Instructions';
import RecipeDescription from './RecipeDescription/RecipeDescription';
import { GET_RECIPE } from '../../../queries';

const RecipePage = () => {
  let { _id } = useParams();
  const { data, loading, error } = useQuery(GET_RECIPE, { variables: { _id } });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const backgroundImage = {
    background: `url(${data.getRecipe.imageUrl}) center center / cover no-repeat`,
    height: '500px'
  };

  const recipeTitle = data.getRecipe.name + ' (' + data.getRecipe.likes + '❤️)';

  return (
    <Container>
      <div style={backgroundImage} />
      <Heading label={recipeTitle} />
      <LikeRecipe _id={_id} />

      <RecipeDescription
        username={data.getRecipe.username}
        description={data.getRecipe.description}
      />

      <Instructions instructions={data.getRecipe.instructions} />
    </Container>
  );
};

export default RecipePage;
