import React, { useState } from 'react';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUser } from '../../actions/userActions';

import UserInfo from './UserInfo';
import Articles from './Articles';
import NewArticle from './NewArticle';
import Following from './Following';
import './Main.css';

let Main = ({ auth, appTitle, userInfo, getUser }) => {
  const [tried, setTried] = useState(false);
  if (!tried) {
    if (userInfo) {
      setTried(true);
    }
    else {
      getUser().then(() => {
        setTried(true);
      });
    }
  }

  if (tried) {
    return (
      <Container>
        {!auth && <Redirect to='/' push></Redirect>}
        <Jumbotron fluid>
          <Container>
            <h1>{appTitle}</h1>
          </Container>
        </Jumbotron>
        <Row>
          <Col sm={4}>
            {userInfo && <UserInfo />}
          </Col>
          <Col>
            {userInfo && <NewArticle />}
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            {userInfo && <Following />}
          </Col>
          <Col>
            {userInfo && <Articles />}
          </Col>
        </Row>
      </Container>
    );
  }
  else {
    return <Container></Container>
  }

}

const mapStateToProps = (state) => {
  return {
    auth: state.user.auth,
    appTitle: state.meta.appTitle,
    userInfo: state.user.info,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser())
  }
}

Main = connect(mapStateToProps, mapDispatchToProps)(Main);
export default Main;