import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Error from '../../components/Error/Error';
import { SIGNIN_USER } from '../../queries/';
import classes from './Signup.module.css';

const SignIn = props => {
  let history = useHistory();
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
        await props.refetch();
        clearState();
        history.push('/');
      })
      .catch(err => console.log(err));
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
    <div className={[classes.SignUp, 'container pt-md-5'].join(' ')}>
      <h1 className={classes.Heading}>Sign in</h1>
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
        {error && <Error error={error.message} />}
      </Form>
    </div>
  );
};

export default SignIn;
