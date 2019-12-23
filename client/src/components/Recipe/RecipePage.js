import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import { GET_RECIPE } from '../../queries/';
import LikeRecipe from './LikeRecipe';
import Container from 'react-bootstrap/Container';

const RecipePage = props => {
  let { _id } = useParams();
  const { data, loading, error } = useQuery(GET_RECIPE, { variables: { _id } });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const backgroundImage = {
    background: `url(${data.getRecipe.imageUrl}) center center / cover no-repeat`,
    height: '500px'
  };

  return (
    <div className="container">
      <div style={backgroundImage}/>
      <h2 style={{ textAlign: 'center' }}>
        <strong>{data.getRecipe.name}</strong>
        <p>
          {data.getRecipe.likes}
          <span role="img" aria-label="heart">
          ❤️<LikeRecipe _id={_id} />
          </span>
        </p>
      </h2>
      

      <Card className="text-center">
        <Card.Body><i>{data.getRecipe.description} - Created by <strong>{data.getRecipe.username}</strong></i>  </Card.Body>
</Card>
      
      <h2>Instructions</h2>
      <p dangerouslySetInnerHTML={{__html: data.getRecipe.instructions}}></p>

      
    </div>
  );
  // return (
  //   <div className="container">
  //     <div
  //       style={{
  //         background: `url(${data.getRecipe.imageUrl}) center center cover no-repeat`
  //       }}
  //     ></div>

  //     <div className="recipe">
  //       <div className="recipe-header">
  //         <h2 className="recipe-name">
  //           <strong>{data.getRecipe.name}</strong>
  //         </h2>
  //         <h5>
  //           <strong>{data.getRecipe.category}</strong>
  //         </h5>
  //         <p>
  //           Created by <strong>{data.getRecipe.username}</strong>
  //         </p>
  //         <p>
  //           {data.getRecipe.likes}{' '}
  //           <span role="img" aria-label="heart">
  //             ❤️
  //           </span>
  //         </p>
  //       </div>
  //     </div>

  //     <h2>{data.getRecipe.name}</h2>
  //     <p>Category: {data.getRecipe.category}</p>
  //     <p>Description: {data.getRecipe.description}</p>
  //     <p>Instructions{data.getRecipe.instructions}</p>
  //     <p>Likes: {data.getRecipe.likes}</p>
  //     <p>Created by: {data.getRecipe.username}</p>
  //     <LikeRecipe _id={data.getRecipe._id} />
  //   </div>
  // );
};

export default RecipePage;
