import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { GET_RECIPE } from '../../queries/';
import LikeRecipe from './LikeRecipe';

const RecipePage = props => {
  let { _id } = useParams();
  const { data, loading, error } = useQuery(GET_RECIPE, { variables: { _id } });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  
  return (
    <div className="container">
      <h2>{data.getRecipe.name}</h2>
      <p>Category: {data.getRecipe.category}</p>
      <p>Description: {data.getRecipe.description}</p>
      <p>Instructions{data.getRecipe.instructions}</p>
      <p>Likes: {data.getRecipe.likes}</p>
      <p>Created by: {data.getRecipe.username}</p>
      <LikeRecipe _id={data.getRecipe._id}/>

    </div>
  );
};

export default RecipePage;
