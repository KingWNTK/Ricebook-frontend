import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Form } from 'react-bootstrap';
import { unlink, baseUrl, linkToRicebook, setShowLinkInfo } from '../../actions/userActions';

const LinkInfo = ({ linkToRicebook, loginAlert }) => {
  const [validated, setValidated] = useState(false);
  const [input, setInput] = useState({
    username: '',
    password: ''
  });

  const handleOnChange = (e, name) => {
    setInput(Object.assign({}, input, { [name]: e.target.value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    linkToRicebook(input.username, input.password).then(() => setValidated(true));
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='loginUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control isValid={validated && loginAlert === ''} isInvalid={validated && loginAlert !== ''} type='input' placeholder='Enter username' value={input.username} onChange={(e) => handleOnChange(e, 'username')} />
          <Form.Control.Feedback type='invalid'>{loginAlert}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='loginPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control isValid={validated && loginAlert === ''} isInvalid={validated && loginAlert !== ''} type='password' placeholder='Password' value={input.password} onChange={(e) => handleOnChange(e, 'password')} />
          <Form.Control.Feedback type='invalid'>{loginAlert}</Form.Control.Feedback>
        </Form.Group>
        <Button type='submit' variant='primary'>Link</Button>
      </Form>
    </div>
  )
}

let CurrentInfo = ({ userInfo, unlink, linkToRicebook, loginAlert, showLinkInfo, setShowLinkInfo }) => {

  const handleUnlink = () => {
    let links = userInfo.user.links;
    if (links.length === 0) return;
    let tpUid = links[0]._id;
    unlink(tpUid);
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title> Current info </Card.Title>
        <Card.Text> Profile picture: </Card.Text>
        <Card.Img src={userInfo.avatar} />
        {
          ['username', 'email', 'zipcode'].map((name, key) =>
            <Card.Text key={key}> {name}: {userInfo[name] || userInfo.user[name]} </Card.Text>
          )
        }
        {
          userInfo && userInfo.user.links.length === 0 && !userInfo.user.thirdPartyType &&
          <a className='btn btn-warning' href={baseUrl + 'link/google'}>link google account</a>
        }
        {
          userInfo && userInfo.user.links.length === 0 && userInfo.user.thirdPartyType &&
          <Button onClick={() => setShowLinkInfo(!showLinkInfo)}>link ricebook account</Button>
        }
        {
          showLinkInfo &&
          <LinkInfo linkToRicebook={linkToRicebook} loginAlert={loginAlert}></LinkInfo>
        }
        {
          userInfo && userInfo.user.links.length > 0 &&
          <div>
            <Card.Text>Linked with account: {userInfo.user.links[0].username}</Card.Text>
            <Button onClick={() => handleUnlink()}>unlink google account</Button>
          </div>
        }
      </Card.Body>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.user.info,
  loginAlert: state.user.loginAlert,
  showLinkInfo: state.user.showLinkInfo
});


const mapDispatchToProps = (dispatch) => ({
  unlink: (tpUid) => dispatch(unlink(tpUid)),
  linkToRicebook: (username, password) => dispatch(linkToRicebook(username, password)),
  setShowLinkInfo: (val) => dispatch(setShowLinkInfo(val))
});


CurrentInfo = connect(mapStateToProps, mapDispatchToProps)(CurrentInfo);

export default CurrentInfo;