import React from 'react';
import Media from 'react-bootstrap/Media';
import snackLogo from '../../media/snack.png';
import breakfastLogo from '../../media/breakfast.png';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';


// const RecipeItem = props => (
//   <li>
//     <Link to={`/recipes/${props._id}`}>
//       <h4>{props.name}</h4>
//     </Link>
//     <p>{props.category}</p>
//   </li>
// );
const RecipeItem = props => (
  <Media as="li">
    <img
      width={64}
      height={64}
      className="mr-3"
      src={breakfastLogo}
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
