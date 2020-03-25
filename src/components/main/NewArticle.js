import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Row, Col, Button, ButtonToolbar, Form, Image, Alert } from 'react-bootstrap';

import { addArticle, baseUrl } from '../../actions/userActions';

import './Main.css';

let NewArticle = ({ uid, addArticle }) => {
  let contentInput;
  const [picUrl, setPicUrl] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleUploadImage = (event) => {
    if (!uploadingImage) {
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
      formData.append('title', uid + Date.now());
      setUploadingImage(true);
      fetch(baseUrl + 'upload/image', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })
        .then(response => response.json())
        .then(json => setPicUrl(json.image))
        .catch(err => setPicUrl(null))
        .finally(() => setUploadingImage(false))
    }
  }
  return (
    <Jumbotron>
      <h4>Add an article</h4>
      <Row>
        <Col sm={3}>
          <Form.Control type='file' className='margin-top' onChange={handleUploadImage}></Form.Control>
          {uploadingImage &&<Alert variant={"primary"}>uploading</Alert>}
        </Col>
        <Col>
          <Form.Control className='newArticleTextarea' as='textarea' placeholder='Enter article content' ref={node => { contentInput = node; }}></Form.Control>
          <ButtonToolbar className='float-right mt-3'>
            <Button className='margin-right' variant='light' onClick={() => { contentInput.value = '' }}>Cancel</Button>
            <Button className='newArticlePost' disabled={uploadingImage} onClick={() => { addArticle(contentInput.value, picUrl); contentInput.value = ''; setPicUrl(null)}}>Post</Button>
          </ButtonToolbar>
          {picUrl && <Image className='mt-3' src={picUrl} style={{ maxWidth: '100%' }}></Image>}
        </Col>
      </Row>

    </Jumbotron>
  )
}

const mapStateToProps = (state) => ({
  uid: state.user.info.user._id
})

const mapDispatchToProps = (dispatch) => ({
  addArticle: (text, picture) => dispatch(addArticle(text, picture))
});

NewArticle = connect(mapStateToProps, mapDispatchToProps)(NewArticle);

export default NewArticle;