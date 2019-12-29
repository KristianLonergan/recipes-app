import React, { useState, useContext, useMemo } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import CKEditor from 'react-ckeditor-component';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ErrorAlert from '../../ErrorAlert/ErrorAlert';
import Heading from '../../UI/Heading/Heading';
import classes from './AddRecipe.module.css';
import { SessionContext } from '../../../context/session';
import withAuth from '../../../hoc/withAuth';
import {
  ADD_RECIPE,
  GET_ALL_RECIPES,
  GET_USER_RECIPES
} from '../../../queries';

const AddRecipe = props => {
  let history = useHistory();
  const { currentUser } = useContext(SessionContext);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('Breakfast');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('Instructions');

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
    const isInvalid =
      !name || !category || !description || !instructions || !imageUrl;
    return isInvalid;
  };

  const clearState = () => {
    setName('');
    setCategory('');
    setDescription('');
    setInstructions('');
    setImageUrl('');
  };

  const handleSubmit = event => {
    event.preventDefault();

    addRecipe({
      variables: {
        name,
        imageUrl,
        category,
        description,
        instructions,
        username: currentUser.username
      },
      refetchQueries: [
        {
          query: GET_USER_RECIPES,
          variables: { username: currentUser.username }
        }
      ]
    }).then(() => {
      clearState();
      history.push('/');
    });
  };

  const instructionsField = useMemo(() => {
    return (
      <CKEditor
        name="instructions"
        content={instructions}
        events={{ change: evt => setInstructions(evt.editor.getData()) }}
      />
    );
  }, [instructions]);

  return (
    <Container>
      <Heading label="Add Recipe" namespaces="pt-md-5" />
      <p className={classes.Paragraph}>* All fields are required</p>

      <Form onSubmit={handleSubmit} className="pt-md-5">
        <Form.Group controlId="recipeName">
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={evt => setName(evt.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="imageUrl">
          <Form.Control
            type="text"
            placeholder="Recipe Image (URL)"
            value={imageUrl}
            onChange={evt => setImageUrl(evt.target.value)}
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
          {instructionsField}
        </Form.Group>

        <Button
          disabled={loading || validateForm()}
          variant="primary"
          type="submit"
          block
        >
          Submit
        </Button>
        {error && <ErrorAlert error={error.message} />}
      </Form>
    </Container>
  );
};

export default withAuth(AddRecipe);
