import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {
  GET_ALL_RECIPES,
  GET_CURRENT_USER,
  GET_USER_RECIPES,
  DELETE_RECIPE
} from '../../queries/';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UpdateRecipeModal from '../Profile/UpdateRecipeModal';

const UserRecipes = ({ username }) => {

  const [showModal, setShowModal] = useState(false);
  const [selectRecipe, setSelectedRecipe] = useState({});
  const { data, loading, error } = useQuery(GET_USER_RECIPES, {
    variables: {
      username
    }
  });

  const closeModal = () => {
    setShowModal(false);
  }

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

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
      }).then(data => console.log(data));
    }
  };

  const showUpdateModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  }

  return (
    <div className="pt-md-5">
      <Card>
        <Card.Header>
          <h1>Your Recipes</h1>
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            {!data.getUserRecipes.length && (
              <p>You have not added any recipes</p>
            )}
            <ul className="list-unstyled">
              {data.getUserRecipes.map(recipe => {
                return (
                  <React.Fragment>
                    <Row>
                      <Col sm={10}>
                        <li key={recipe._id}>
                          <Link to={`/recipes/${recipe._id}`}>
                            <h4>{recipe.name}</h4>
                          </Link>
                          <p>Likes: {recipe.likes}</p>
                        </li>
                      </Col>
                      <Col>
                        <Button
                          style={{
                            position: 'absolute',
                            right: '10px',
                            bottom: '25px'
                          }}
                          variant="danger"
                          onClick={() => handleDelete(recipe._id)}
                        >
                          Delete
                        </Button>
                        <Button
                          style={{
                            position: 'absolute',
                            bottom: '25px'
                          }}
                          variant="success"
                          onClick={() => showUpdateModal(recipe)}
                        >
                          Update
                        </Button>
                      </Col>
                    </Row>
                    <hr />
                  </React.Fragment>
                );
              })}
            </ul>
          </blockquote>
        </Card.Body>
      </Card>
      <UpdateRecipeModal show={showModal} close={closeModal} {...selectRecipe}/>
    </div>
  );
};

export default UserRecipes;
