import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import {getFollowing, getFollowingProfiles, followUser, unfollowUser } from '../../actions/userActions';


let Following = ({ following, getFollowingProfiles, followUser, unfollowUser, followAlert }) => {
  const [tried, setTried] = useState(false);

  if (!tried && !following) {
    setTried(true);
    getFollowingProfiles();
  }

  let usernameInput;

  return (
    <div className='margin-top'>
      <h2>Following</h2>
      {
        following &&
        following.map((user, key) =>
          <Card className='my-card' key={key}>
            <Card.Body>
              <Card.Img src={user.profile.avatar}></Card.Img>
              <Card.Title>{user.username}</Card.Title>
              <Card.Text>{user.profile.headline}</Card.Text>
              <Button variant='light' onClick={(e) => unfollowUser(user.username)}>Unfollow</Button>
            </Card.Body>
          </Card>
        )
      }
      {followAlert && <Alert variant='danger'>{followAlert}</Alert>}
      <Row>
        <Col>
          <Form.Control type='input' placeholder='Username' ref={node => { usernameInput = node; }}></Form.Control>
        </Col>
        <Col>
          <Button onClick={(e) => { followUser(usernameInput.value); usernameInput.value = ''; }}>Follow</Button>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => {
  return ({
    following: state.user.following,
    followAlert: state.user.followAlert
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    getFollowingProfiles: () => dispatch(getFollowingProfiles()),
    followUser: (username) => dispatch(followUser(username)),
    unfollowUser: (username) => dispatch(unfollowUser(username)),
  });
}

Following = connect(mapStateToProps, mapDispatchToProps)(Following);

export default Following;