import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Form, Button } from 'react-bootstrap';

import { loginUser, baseUrl } from '../../actions/userActions';
import './Landing.css';


let Login = ({ auth, verifyUser, loginAlert }) => {
  const [validated, setValidated] = useState(false);
  const [input, setInput] = useState({
    username: '',
    password: ''
  })

  const handleOnChange = (e, name) => {
    setInput(Object.assign({}, input, { [name]: e.target.value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyUser(input.username, input.password).then(() => setValidated(true));
  }

  // const handleLoginWithGoogle = () => {
  //   fetch('http://localhost:3000/auth/google');
  //   // window.location.replace('http://localhost:3000/auth/google');
  // }

  return (
    <Jumbotron>
      <h2>Log in</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='loginUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control isValid={validated && auth} isInvalid={validated && !auth} type='input' placeholder='Enter username' value={input.username} onChange={(e) => handleOnChange(e, 'username')} />
          <Form.Control.Feedback type='invalid'>{loginAlert}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='loginPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control isValid={validated && auth} isInvalid={validated && !auth} type='password' placeholder='Password' value={input.password} onChange={(e) => handleOnChange(e, 'password')} />
          <Form.Control.Feedback type='invalid'>{loginAlert}</Form.Control.Feedback>
        </Form.Group>
        <Button className='loginSubmit' type='submit' variant='primary'>Login</Button>
        <a className='btn btn-warning ml-3' href={baseUrl + 'auth/google'}>login with google</a>
      </Form>
    </Jumbotron>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.user.auth,
    loginAlert: state.user.loginAlert
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyUser: (username, password) => {
      return dispatch(loginUser(username, password))
    }
  }
}
Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;