import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Form, Button, Alert } from 'react-bootstrap';

import { registerUser } from '../../actions/userActions';

let Register = ({ registerUser, registerAlert }) => {
  const [alert, setAlert] = useState({
    username: null,
    email: null,
    birthday: null,
    zipcode: null,
    password: null,
    confirmPassword: null
  });
  const [input, setInput] = useState({
    username: '',
    email: '',
    birthday: '',
    zipcode: '',
    password: '',
    confirmPassword: ''
  });
  const [validated, setValidated] = useState(false);

  const validateInput = (input, name, reg, msg) => {
    let ret = reg.exec(input[name]) !== null;
    return ret ? null : msg;
  }
  const validateDate = (input, name, limit, msg) => {
    let bd = new Date(input[name]);
    bd.setTime(bd.getTime() + bd.getTimezoneOffset() * 60 * 1000);
    bd.setFullYear(bd.getFullYear() + limit);
    return bd < Date.now() ? null : msg;
  }
  const validatePassword = (input, msg) => {
    let ret = input.password === input.confirmPassword;
    return ret ? null : msg;
  }

  const isValid = (name) => {
    return validated && (alert[name] === null);
  }

  const isInvalid = (name) => {
    return validated && (alert[name] !== null);
  }

  const handleOnchange = (e, name) => {
    setInput(Object.assign({}, input, {[name]: e.target.value}));
    updateAlert(Object.assign({}, input, {[name]: e.target.value}));
  }

  const updateAlert = (input) => {
    let newAlert = Object.assign({}, alert);
    newAlert['username'] = validateInput(input, 'username', /.+/, 'Empty username!');
    if(!newAlert['username']) {
      newAlert['username'] = validateInput(input, 'username', /^[a-zA-Z][a-zA-Z0-9]*$/, 'Invalid username! should not start with number and only contain upper and lower case characters and numbers');
    }
    newAlert['email'] = validateInput(input, 'email', /^.+@.+\..+$/, 'Invalid email!');
    newAlert['zipcode'] = validateInput(input, 'zipcode', /^\d{5}$/, 'Invalid zipcode!');
    newAlert['birthday'] = validateDate(input, 'birthday', 18, 'Age must be above 18!');
    newAlert['password'] = validateInput(input, 'password', /.+/, 'Empty Password!');
    if(newAlert['password'] === null) {
      newAlert['password'] = validatePassword(input, 'Passwords not match')
    }
    newAlert['confirmPassword'] = newAlert['password'];
    setAlert(newAlert);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    let valid = Object.values(alert).reduce((res, v) => res &= (v === null), true);
    if (valid) {
      registerUser(Object.assign({}, ...Object.keys(input).map(k => ({ [k]: input[k] }))));
    }
  }

  return (
    <Jumbotron>
      <h2>Register</h2>
      {registerAlert !== '' && <Alert variant='danger'>{registerAlert}</Alert>}
      <Form onSubmit={handleSubmit}>
        {
          ['username', 'email', 'zipcode'].map((name, idx) =>
            <Form.Group controlId={name} key={idx}>
              <Form.Label>{name.charAt(0).toUpperCase() + name.slice(1)}</Form.Label>
              <Form.Control isValid={isValid(name)} isInvalid={isInvalid(name)} 
                type='input' placeholder={'Enter ' + name} value={input[name]} onChange={(e) => handleOnchange(e, name)}></Form.Control>
              <Form.Control.Feedback type='invalid'>{alert[name]}</Form.Control.Feedback>
            </Form.Group>
          )
        }
        <Form.Group controlId={'birthday'}>
          <Form.Label>Birthday</Form.Label>
          <Form.Control isValid={isValid('birthday')} isInvalid={isInvalid('birthday')} 
            type='date' placeholder='Enter birthday' value={input.birthday} onChange={(e) => handleOnchange(e, 'birthday')}></Form.Control>
          <Form.Control.Feedback type='invalid'>{alert.birthday}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId={'password'}>
          <Form.Label>Password</Form.Label>
          <Form.Control isValid={isValid('password')} isInvalid={isInvalid('password')} 
            type='password' placeholder='Enter password' value={input.password} onChange={(e) => handleOnchange(e, 'password')}></Form.Control>
          <Form.Control.Feedback type='invalid'>{alert.password}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId={'confirmPassword'}>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control isValid={isValid('confirmPassword')} isInvalid={isInvalid('confirmPassword')} 
            type='password' placeholder='Confrim password' value={input.confirmPassword} onChange={(e) => handleOnchange(e, 'confirmPassword')}></Form.Control>
          <Form.Control.Feedback type='invalid'>{alert.password}</Form.Control.Feedback>
        </Form.Group>
        <Button className='registerSubmit' type='submit' variant='primary'>Register</Button>
      </Form>
    </Jumbotron>
  )
}

const mapStateToProps = (state) => ({
  registerAlert: state.user.registerAlert
})

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (info) => dispatch(registerUser(info)),
  }
}

Register = connect(mapStateToProps, mapDispatchToProps)(Register);

export default Register;