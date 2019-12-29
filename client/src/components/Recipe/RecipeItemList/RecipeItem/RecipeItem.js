import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RecipeImage from './RecipeImage/RecipeImage';
import Likes from './Likes/Likes';

const RecipeItem = props => (
  <Row>
    <Col sm={10}>
      <RecipeImage {...props} />
    </Col>
    <Col>
      <Likes numOfLikes={props.likes} />
    </Col>
  </Row>
);

export default RecipeItem;
