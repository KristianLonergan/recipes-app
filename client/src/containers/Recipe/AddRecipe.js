import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Error from '../../components/Error/Error';
import classes from './AddRecipe.module.css';
import withAuth from '../../hoc/withAuth';

import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries/';

const AddRecipe = props => {
  let history = useHistory();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Breakfast');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');

  const [addRecipe, { loading, error }] = useMutation(ADD_RECIPE, {
    update(cache, { data: { addRecipe } }) {
      const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });

      cache.writeQuery({
        query: GET_ALL_RECIPES,
        data: {
          getAllRecipes: [addRecipe, ...getAllRecipes]
        }
      });
    }
  });

  const validateForm = () => {
    const isInvalid = !name || !category || !description || !instructions;
    return isInvalid;
  };

  const clearState = () => {
    setName('');
    setCategory('');
    setDescription('');
    setInstructions('');
  };

  const handleSubmit = event => {
    event.preventDefault();

    addRecipe({
      variables: {
        name,
        category,
        description,
        instructions,
        username: props.session.getCurrentUser.username
      },
      refetchQueries: [
        { query: GET_USER_RECIPES, variables: { username: props.session.getCurrentUser.username } }
      ]
    })
      .then(({ data }) => {
        clearState();
        history.push('/');
      })
      .catch();
  };

  return (
    <div className={[classes.AddRecipe, 'container pt-md-5'].join(' ')}>
      <h1 className={classes.Heading}>Add Recipe</h1>
      <p className={['lead text-center', classes.Paragraph].join(' ')}>
        * All fields are required
      </p>

      <Form onSubmit={handleSubmit} className="pt-md-5">
        <Form.Group controlId="recipeName">
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={evt => setName(evt.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formGridState">
          <Form.Control
            value={category}
            as="select"
            onChange={evt => setCategory(evt.target.value)}
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="descriptionField">
          <Form.Control
            type="text"
            placeholder="Description"
            value={description}
            onChange={evt => setDescription(evt.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            placeholder="Add instructions"
            as="textarea"
            rows="5"
            value={instructions}
            onChange={evt => setInstructions(evt.target.value)}
          />
        </Form.Group>

        <Button
          disabled={loading || validateForm()}
          variant="primary"
          type="submit"
          block
        >
          Submit
        </Button>
        {error && <Error error={error.message} />}
      </Form>
    </div>
  );
};

export default withAuth(session => session && session.getCurrentUser)(AddRecipe);
