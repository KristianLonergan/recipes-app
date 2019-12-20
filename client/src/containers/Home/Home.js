import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_RECIPES } from '../../queries/';
import RecipeItem from '../../components/Recipe/RecipeItem';

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_RECIPES);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error occured</div>;

  return (
    <ul>
      <h1>Home</h1>
      {data.getAllRecipes.map(recipe => <RecipeItem key={recipe._id} {...recipe}/>)}
    </ul>
  );
}

export default Home;
