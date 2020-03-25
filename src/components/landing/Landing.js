import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { getUser } from '../../actions/userActions';

// import Login from '../Login';
import Login from './Login';
import Register from './Register';
import './Landing.css';

let Landing = ({ appTitle, auth, getUser }) => {
  const [tried, setTried] = useState(false);

  if (!tried) {
    setTried(true);
    getUser();
  }
  

  if (tried) {
    return (
      <Container>
        {tried && auth && <Redirect to='/main' push></Redirect>}
        <h1 className="title">{appTitle}</h1>
        <Row>
          <Col>
            <Register />
          </Col>
          <Col>
            <Login />
          </Col>
        </Row>
      </Container>
    );
  }
  else {
    return <Container></Container>
  }

}

const mapStateToProps = (state) => ({
  auth: state.user.auth,
  appTitle: state.meta.appTitle,
})

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser())
})

Landing = connect(mapStateToProps, mapDispatchToProps)(Landing);
export default Landing;