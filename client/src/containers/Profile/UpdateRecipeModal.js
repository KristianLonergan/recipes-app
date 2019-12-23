import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Error from '../../components/Error/Error';
import CKEditor from 'react-ckeditor-component';
import Modal from 'react-bootstrap/Modal';
import { UPDATE_USER_RECIPE } from '../../queries/';

const UpdateRecipeModal = props => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');

  const [updateUserRecipe, { loading, error }] = useMutation(
    UPDATE_USER_RECIPE
  );

  useEffect(() => {
    if (props.name) setName(props.name);
    if (props.category) setCategory(props.category);
    if (props.description) setDescription(props.description);
    if (props.instructions) setInstructions(props.instructions);
    if (props.imageUrl) setImageUrl(props.imageUrl);
  }, [props]);

  const handleUpdate = event => {
    updateUserRecipe({
      variables: {
        _id: props._id,
        name,
        imageUrl,
        category,
        description,
        instructions
      }
    }).then(data => {
      props.close();
    });;
  };

  return (
    <Modal size="lg" centered show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>{props.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
          <CKEditor
            name="instructions"
            content={instructions}
            events={{ change: evt => setInstructions(evt.editor.getData()) }}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
        <Button variant="secondary" onClick={() => props.close()}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateRecipeModal;
