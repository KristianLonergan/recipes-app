import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory, Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Error from '../../components/Error/Error';
import { SIGNUP_USER } from '../../queries/';
import classes from './Signup.module.css';

const SignUp = props => {

  let history = useHistory();
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confimPassword, setConfimPassword] = useState('');

  const handleSubmit = event => {

    event.preventDefault();

    if (isFormValid) {
      signupUser({
        variables: {
          username,
          email,
          password
        }
      })
      .then(async (response) => {
        localStorage.setItem('token', response.data.signupUser.token);
        await props.refetch();
        clearState();
        history.push('/');
      })
      .catch(err => console.log(err));
    }

  };

  const isFormValid = () => {
    const isInvalid = !username || !email || !password || password !== confimPassword
    return isInvalid;
  }

  const clearState = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfimPassword('');
  }

  console.log(data);

  return (
    <div className={[classes.SignUp, 'container pt-md-5'].join(' ')}>
      <h1 className={classes.Heading}>Sign up</h1>
      <p className={["lead text-center", classes.Paragraph].join(' ')}>* All fields are required</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={evt => setUsername(evt.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={evt => setEmail(evt.target.value)}
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

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confimPassword}
            onChange={evt => setConfimPassword(evt.target.value)}
          />
        </Form.Group>

        <Button disabled={loading || isFormValid()} variant="primary" type="submit" block>
          Submit
        </Button>
        <Link to="/signin">Already have an account ? Sign in here!</Link>
        {error && <Error error={error.message}/>}
      </Form>
    </div>
  );
};

export default SignUp;
