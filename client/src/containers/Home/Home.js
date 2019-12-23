import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_RECIPES } from '../../queries/';
import RecipeItem from '../../components/Recipe/RecipeItem';
import CardDeck from 'react-bootstrap/CardDeck';

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_RECIPES);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error occured</div>;
 
  return (
    <div className="container pt-md-5">
      <h1 style={{ textAlign: 'center' }}>
        Find Recipes You <strong>Love</strong>
      </h1>

      <ul className="list-unstyled">

      <h4>
        Most Recent
      </h4>
        <hr></hr>
        {data.getAllRecipes.map(recipe => (
          <React.Fragment key={recipe._id}>
            <RecipeItem key={recipe._id} {...recipe} />
            <hr/>
          </React.Fragment>
            
        ))}
        
      </ul>
    </div>
  );
};

export default Home;
