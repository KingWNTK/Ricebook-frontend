import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { getUser } from '../../actions/userActions';

import CurrentInfo from './CurrentInfo';
import NewInfo from './NewInfo';
import './Profile.css'

let Profile = ({ auth, userInfo, getUser }) => {
  const [redirect, setRedirect] = useState(false);
  const [tried, setTried] = useState(false);
  if (!tried && !userInfo) {
    getUser().then(() => setTried(true));
  }
  return (
    <Container>
      {tried && !auth && <Redirect to='/' push />}
      {redirect && <Redirect to='/main' push />}
      <Button className='margin-top' onClick={(e) => setRedirect(true)}> Main Page </Button>
      <Row>
        <Col className='margin-top'>
          {userInfo && <CurrentInfo />}
        </Col>
        <Col className='margin-top'>
          {userInfo && <NewInfo />}
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  auth: state.user.auth,
  userInfo: state.user.info,
})

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
});

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile;