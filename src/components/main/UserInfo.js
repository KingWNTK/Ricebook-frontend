import React, { useState } from 'react';
import { Jumbotron, ButtonToolbar, Button, Form, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logoutUser, updateHeadline } from '../../actions/userActions';

import './Main.css'

let UserInfo = ({ username, status, avatar, logoutUser, updateHeadline }) => {
  const [redirect, setRedirect] = useState(false);
  let statusInput;

  return (
    <Jumbotron className='user-info-wrap'>
      {redirect && <Redirect to='/profile' push></Redirect>}
      <ButtonToolbar>
        <Button variant='light' className='userLogout margin-right' onClick={(e) => { logoutUser() }}>Log out</Button>
        <Button onClick={e => { setRedirect(true) }}>Profile</Button>
      </ButtonToolbar>
      <img alt='profile' src={avatar} className='user-img' />
      <h2>{username}</h2>
      <h3 className='userStatus'>{status}</h3>
      <Row>
        <Col>
          <Form.Control className='newStatusInput' type='input' placeholder='New status' ref={node => { statusInput = node; }}></Form.Control>
        </Col>
        <Col>
          <Button className='changeStatusBtn' onClick={(e) => { statusInput.value !== '' && updateHeadline(statusInput.value); }}>Update</Button>
        </Col>
      </Row>
    </Jumbotron>
  )
}

const mapStateToProps = (state) => {
  return {
    username: state.user.info.user.username,
    status: state.user.info.headline,
    avatar: state.user.info.avatar,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    updateHeadline: (headline) => dispatch(updateHeadline(headline))
  }
}

UserInfo = connect(mapStateToProps, mapDispatchToProps)(UserInfo);

export default UserInfo;