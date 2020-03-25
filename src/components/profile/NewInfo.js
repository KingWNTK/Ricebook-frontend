import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button } from 'react-bootstrap';

import { updateProfile, baseUrl } from '../../actions/userActions';


let NewInfo = ({ uid, updateProfile }) => {
  const [alert, setAlert] = useState({
    email: null,
    zipcode: null,
    password: null,
    confirmPassword: null
  });
  const [input, setInput] = useState({
    email: '',
    zipcode: '',
    password: '',
    confirmPassword: '',
    avatar: ''
  })

  const [validated, setValidated] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);

  const validateInput = (input, name, reg, msg) => {
    if (input[name] === '') return null;
    let ret = reg.exec(input[name]) !== null;
    return ret ? null : msg;
  }

  const validatePassword = (input, msg) => {
    let ret = input.password === input.confirmPassword;
    return ret ? null : msg;
  }

  const isValid = (name) => {
    return input[name] !== '' && validated && (alert[name] === null);
  }

  const isInvalid = (name) => {
    return input[name] !== '' && validated && (alert[name] !== null);
  }

  const updateAlert = (input) => {
    let newAlert = Object.assign({}, alert);
    newAlert['email'] = validateInput(input, 'email', /^.+@.+\..+$/, 'Invalid email!');
    newAlert['zipcode'] = validateInput(input, 'zipcode', /^\d{5}$/, 'Invalid zipcode!');
    newAlert['password'] = validatePassword(input, 'Passwords not match');
    newAlert['confirmPassword'] = newAlert['password'];
    setAlert(newAlert);
  }

  const handleOnchange = (e, name) => {
    setInput(Object.assign({}, input, { [name]: e.target.value }));
    updateAlert(Object.assign({}, input, { [name]: e.target.value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
    let valid = Object.values(alert).reduce((res, v) => res &= (v === null), true);
    let parsed = Object.keys(input).filter(k => input[k] !== '').map(k => ({ [k]: input[k] }));
    if (valid) {
      updateProfile(Object.assign({}, ...parsed));
      setInput({
        email: '',
        zipcode: '',
        password: '',
        confirmPassword: ''
      });
    }
  }

  const handleUploadImage = (event) => {
    if (!uploadingImage) {
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
      formData.append('title', uid);
      setUploadingImage(true);
      fetch(baseUrl + 'upload/image', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })
        .then(response => response.json())
        .then(json => setInput(Object.assign({}, input, { avatar: json.image })))
        .catch(err => setInput(Object.assign({}, input, { avatar: '' })))
        .finally(() => setUploadingImage(false))
    }
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>New info</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>New profile picture:</Form.Label>
            <Form.Control type='file' className='margin-top' onChange={handleUploadImage}></Form.Control>
          </Form.Group>
          {
            ['email', 'zipcode'].map((name, key) => {
              let nm = name.charAt(0).toUpperCase() + name.slice(1);
              return (
                <Form.Group key={key}>
                  <Form.Label>New {nm}: </Form.Label>
                  <Form.Control isValid={isValid(name)} isInvalid={isInvalid(name)}
                    type='input' placeholder={'Enter new ' + name} value={input[name]} onChange={(e) => handleOnchange(e, name)}></Form.Control>
                  <Form.Control.Feedback type='invalid'>{alert[name]}</Form.Control.Feedback>
                </Form.Group>
              )
            })
          }
          <Form.Group>
            <Form.Label>New password: </Form.Label>
            <Form.Control isValid={isValid('password')} isInvalid={isInvalid('password')}
              type='password' placeholder='Enter new password' value={input.password} onChange={(e) => handleOnchange(e, 'password')}></Form.Control>
            <Form.Control.Feedback type='invalid'>{alert.password}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm new password: </Form.Label>
            <Form.Control isValid={isValid('confirmPassword')} isInvalid={isInvalid('confirmPassword')}
              type='password' placeholder='Confrim new password' value={input.confirmPassword} onChange={(e) => handleOnchange(e, 'confirmPassword')}></Form.Control>
            <Form.Control.Feedback type='invalid'>{alert.password}</Form.Control.Feedback>
          </Form.Group>
          <Button type='submit' disabled={uploadingImage}>Update</Button> {uploadingImage && <span>uploading image</span>}
        </Form>
      </Card.Body>
    </Card>
  );
}
const mapStateToProps = state => ({
  uid: state.user.info.user._id
})
const mapDispatchToProps = (dispatch) => ({
  updateProfile: (info) => {
    dispatch(updateProfile(info));
  }
})

NewInfo = connect(mapStateToProps, mapDispatchToProps)(NewInfo);

export default NewInfo;