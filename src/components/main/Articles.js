import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { setKeyword, getFeed, commentArticle, editArticle, editComment } from '../../actions/userActions';

import './Main.css'

const Comment = ({ uid, aid, comment, editComment }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editInput, setEditInput] = useState(comment.text);

  React.useEffect(() => {
    setEditInput(comment.text);
    setShowEdit(false);
  }, [comment.text])

  const handleSave = () => {
    editComment(aid, comment._id, editInput);
    setShowEdit(false);
  }
  return (
    <Card className='margin-top'>
      <Card.Body>
        {!showEdit && <Card.Text>{comment.text}</Card.Text>}
        {
          showEdit &&
          <div>
            <Row>
              <Col>
                <Form.Control as='textarea' value={editInput} onChange={(e) => setEditInput(e.target.value)}></Form.Control>
              </Col>
              <Col sm={2}>
                <Button variant='success' className='float-right' onClick={handleSave}>Save</Button>
              </Col>
            </Row>
          </div>
        }
        <Row>
          <Col>
            <Card.Text>{comment.author.username} Commented at: {new Date(comment.date).toLocaleTimeString("en-US")}, {new Date(comment.date).toLocaleDateString("en-US")}</Card.Text>
          </Col>
          {
            uid === comment.author._id &&
            <Col>
              <Button variant='secondary' className='float-right' onClick={() => setShowEdit(!showEdit)}>edit</Button>
            </Col>
          }
        </Row>

      </Card.Body>
    </Card>
  )
}

const Comments = ({ uid, aid, comments, commentArticle, editComment }) => {
  const [btnMessage, setBtnMessage] = useState('Hide comments');
  const [showCmt, setShowCmt] = useState(true);
  const [inputText, setInputText] = useState('');

  React.useEffect(() => {
    setBtnMessage('Hide comments');
    setShowCmt(true);
    setInputText('');
  }, [comments])

  return (
    <div className='margin-top'>
      <Row>
        <Col>
          <Form.Control type='input' value={inputText} onChange={e => setInputText(e.target.value)}></Form.Control>
        </Col>
        <Col sm={2}>
          <Button variant='primary' className='float-right' onClick={e => inputText != '' && commentArticle(aid, inputText)}>comment</Button>
        </Col>
      </Row>
      {
        comments.length > 0 &&
        <Button variant='info' className='margin-top' onClick={e => { setShowCmt(!showCmt); setBtnMessage(showCmt ? 'Show comments' : 'Hide comments') }}>{btnMessage}</Button>
      }
      {
        showCmt &&
        comments &&
        comments.map((comment, idx) => (
          <Comment uid={uid} key={idx} comment={comment} editComment={editComment} aid={aid}></Comment>
        ))
      }

    </div >

  )
}

const Article = ({ uid, article, commentArticle, editComment, editArticle }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editInput, setEditInput] = useState(article.text);

  React.useEffect(() => {
    setEditInput(article.text);
    setShowEdit(false);
  }, [article.text])

  const handleSave = () => {
    editArticle(article._id, editInput);
    setShowEdit(false);
  }

  return (
    <Card className='my-card'>
      <Card.Body>
        {/* <Card.Title>{article.title}</Card.Title> */}
        <Card.Text>Author: {article.author.username}</Card.Text>
        {!showEdit && <Card.Text>{article.text}</Card.Text>}
        {
          showEdit &&
          <div>
            <Row>
              <Col>
                <Form.Control as='textarea' value={editInput} onChange={(e) => setEditInput(e.target.value)}></Form.Control>
              </Col>
              <Col sm={2}>
                <Button variant='success' className='float-right' onClick={handleSave}>Save</Button>
              </Col>
            </Row>

          </div>
        }
        {article.picture && <Card.Img src={article.picture} style={{maxHeight: 300, width: 'auto'}}></Card.Img>}
        <div className='margin-top'>
          <Row>
            <Col>
              <Card.Text>Posted at: {new Date(article.date).toLocaleTimeString("en-US")}, {new Date(article.date).toLocaleDateString("en-US")}</Card.Text>
            </Col>
            {
              uid === article.author._id &&
              <Col>
                <Button variant='secondary' className='float-right' onClick={() => setShowEdit(!showEdit)}>edit</Button>
              </Col>
            }

          </Row>
        </div>
        <Comments uid={uid} comments={article.comments} aid={article._id} commentArticle={commentArticle} editComment={editComment} />
      </Card.Body>
    </Card>
  )
}

let Articles = ({ uid, articles, keyword, setKeyword, getFeed, commentArticle, editArticle, editComment }) => {
  const [tried, setTried] = useState(false);

  if (!tried && !articles) {
    setTried(true);
    getFeed()
  }

  return (
    <div className='margin-top'>
      <h2>Your Articles</h2>
      <Form.Control className='articleKeyword' type='input' placeholder='Search article' value={keyword} onChange={e => setKeyword(e.target.value)}></Form.Control>
      {
        articles &&
        articles.map((article, idx) => (
          <Article uid={uid} article={Object.assign({}, article)} key={idx} commentArticle={commentArticle} editArticle={editArticle} editComment={editComment}></Article>
        ))
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  articles: (state.user.displayArticles || state.user.articles),
  keyword: state.user.keyword,
  uid: state.user.info.user._id
})

const mapDispatchToProps = (dispatch) => ({
  setKeyword: (keyword) => dispatch(setKeyword(keyword)),
  getFeed: () => dispatch(getFeed()),
  commentArticle: (aid, text) => dispatch(commentArticle(aid, text)),
  editArticle: (aid, text) => dispatch(editArticle(aid, text)),
  editComment: (aid, cid, text) => dispatch(editComment(aid, cid, text))
})

Articles = connect(mapStateToProps, mapDispatchToProps)(Articles);

export default Articles;