import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Heading from '../../UI/Heading/Heading';
import ErrorAlert from '../../ErrorAlert/ErrorAlert';
import { SessionContext } from '../../../context/session';
import { SIGNIN_USER } from '../../../queries';
import classes from './SignIn.module.css';

const SignIn = props => {
  let history = useHistory();
  const { refetch } = useContext(SessionContext);
  const [signinUser, { loading, error }] = useMutation(SIGNIN_USER);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    signinUser({
      variables: {
        username,
        password
      }
    })
      .then(async response => {
        localStorage.setItem('token', response.data.signinUser.token);
        await refetch();
        clearState();
        history.push('/');
      })
      .catch(err => console.error(err));
  };

  const validateForm = () => {
    const isInvalid = !username || !password;
    return isInvalid;
  };

  const clearState = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <Container className={[classes.SignIn, 'pt-md-5'].join(' ')}>
      <Heading label="Sign in" namespaces={classes.Heading} />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={evt => setUsername(evt.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={evt => setPassword(evt.target.value)}
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
        <Link to="/signup">Don't have an account ? Sign up here!</Link>
        {error && <ErrorAlert error={error.message} />}
      </Form>
    </Container>
  );

};

export default SignIn;
