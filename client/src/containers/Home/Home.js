import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_RECIPES } from '../../queries/';
import RecipeItem from '../../components/Recipe/RecipeItem';

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_RECIPES);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error occured</div>;

  // return (
  //   <ul className="list-unstyled container">
  //     <h1 style={{textAlign: 'center'}} >Find Recipes You <strong>Love</strong></h1>
  //     {data.getAllRecipes.map(recipe => <RecipeItem key={recipe._id} {...recipe}/>)}
  //   </ul>
  // );
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
          <React.Fragment>
            <RecipeItem key={recipe._id} {...recipe} />
            <hr/>
          </React.Fragment>
          
        ))}
      </ul>
    </div>
  );
};

export default Home;
