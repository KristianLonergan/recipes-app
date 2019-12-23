import React from 'react';
import Media from 'react-bootstrap/Media';
import snackLogo from '../../media/snack.png';
import breakfastLogo from '../../media/breakfast.png';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// const RecipeItem = props => (
//   <li>
//     <Link to={`/recipes/${props._id}`}>
//       <h4>{props.name}</h4>
//     </Link>
//     <p>{props.category}</p>
//   </li>
// );
// const RecipeItem = props => (
//   <Card style={{ width: '18rem', textAlign: "center" }}>
//     <Card.Img style={{ height: '80%' }} variant="top" src={props.imageUrl} />
//     <Card.Body>
//       <Card.Title>
//         <Link to={`/recipes/${props._id}`}>{props.name}</Link>
//       </Card.Title>
//     </Card.Body>
//   </Card>
// );
// const RecipeItem = props => (
//   <Card className="bg-dark text-white">
//     <Card.Img src={props.imageUrl} alt="Card image" />
//     <Card.ImgOverlay>
//       <Card.Title>Card title</Card.Title>
//       <Card.Text>
//         This is a wider card with supporting text below as a natural lead-in to
//         additional content. This content is a little bit longer.
//       </Card.Text>
//       <Card.Text>Last updated 3 mins ago</Card.Text>
//     </Card.ImgOverlay>
//   </Card>
// );
const RecipeItem = props => (
  <Media as="li">
    <img
      width={64}
      height={64}
      className="mr-3"
      src={props.imageUrl}
      alt="Generic placeholder"
    />
    <Media.Body>
      <Link to={`/recipes/${props._id}`}>
        <h4>{props.name}</h4>
      </Link>
      <p>{props.description}</p>

    </Media.Body>
  </Media>
);

export default RecipeItem;
