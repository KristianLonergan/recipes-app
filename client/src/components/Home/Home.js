import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Container from 'react-bootstrap/Container';
import Spinner from '../UI/Spinner/LoadingSpinner';
import RecipeItemList from '../Recipe/RecipeItemList/RecipeItemList';
import Heading from '../UI/Heading/Heading';
import { GET_ALL_RECIPES } from '../../queries';

const Home = React.memo(() => {
  const { loading, error, data } = useQuery(GET_ALL_RECIPES);

  if (loading) return <Spinner />;
  if (error) return <div>Error occured</div>;

  return (
    <Container className="pt-md-5">
      <Heading label="Find Recipes You Love"/>
      <h4>Most Recent</h4>
      <RecipeItemList recipes={data.getAllRecipes}/>
    </Container>
  );
});

export default Home;
