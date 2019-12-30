import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/react-hooks';
import UpdateRecipeModal from './UpdateRecipe/UpdateRecipeModal';
import {
  GET_ALL_RECIPES,
  GET_CURRENT_USER,
  GET_USER_RECIPES,
  DELETE_RECIPE
} from '../../../../../queries';
import classes from './UserRecipeItem.module.css';

const UserRecipeItem = ({ username, recipe }) => {

  const [showModal, setShowModal] = useState(false);
  const [selectRecipe, setSelectedRecipe] = useState({});

  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    update(cache, { data: { deleteUserRecipe } }) {
      const { getUserRecipes } = cache.readQuery({
        query: GET_USER_RECIPES,
        variables: { username }
      });

      cache.writeQuery({
        query: GET_USER_RECIPES,
        variables: { username },
        data: {
          getUserRecipes: getUserRecipes.filter(
            recipe => recipe._id !== deleteUserRecipe._id
          )
        }
      });
    }
  });

  const handleDelete = _id => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this recipe?'
    );

    if (confirmDelete) {
      deleteRecipe({
        variables: {
          _id
        },
        refetchQueries: [
          { query: GET_ALL_RECIPES },
          { query: GET_CURRENT_USER }
        ]
      }).then(data => console.error(data));
    }
  };

  const showUpdateModal = recipe => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Row>

        <Col xs={10}>
          <li>
            <Link to={`/recipes/${recipe._id}`}>
              <h4>{recipe.name}</h4>
            </Link>
            <blockquote className="blockquote mb-0">
              Likes: {recipe.likes}
            </blockquote>
          </li>
        </Col>

        <Col className={classes.Actions}>
          <Button className={classes.UpdateBtn} variant="success" onClick={() => showUpdateModal(recipe)}>
            Update
          </Button>

          <Button className={classes.DeleteBtn} variant="danger" onClick={() => handleDelete(recipe._id)}>
            Delete
          </Button>
        </Col>

      </Row>

      <UpdateRecipeModal show={showModal} close={closeModal} {...selectRecipe} />

    </>
  );
};

export default UserRecipeItem;
