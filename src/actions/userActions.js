export const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://yw90-final-be.herokuapp.com/';

export const LOGIN_USER_REQUESTED = 'LOGIN_USER_REQUESTED';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERR = 'LOGIN_USER_ERR';
export const loginUser = (username, password) => (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUESTED });
  return fetch(baseUrl + 'login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(response => response.json())
    .then(json => dispatch({ type: LOGIN_USER_SUCCESS }))
    .catch(err => dispatch({ type: LOGIN_USER_ERR }));
}

export const LOGOUT_USER_REQUESTED = 'LOGOUT_USER_REQUESTED';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_ERR = 'LOGOUT_USER_ERR';
export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER_REQUESTED });
  return fetch(baseUrl + 'logout', {
    method: 'PUT',
    credentials: 'include',
  })
    .then(() => dispatch({ type: LOGOUT_USER_SUCCESS }))
    .catch(err => dispatch({ type: LOGOUT_USER_ERR }));
}

export const REGISTER_USER_REQUESTED = 'REGISTER_USER_REQUESTED';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERR = 'REGISTER_USER_ERR';
export const registerUser = (info) => (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUESTED });
  return fetch(baseUrl + 'register', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      username: info.username,
      password: info.password,
      zipcode: info.zipcode,
      email: info.email,
      dob: info.birthday
    })
  })
    .then(response => response.json())
    .then(json => dispatch({ type: REGISTER_USER_SUCCESS }))
    .then(() => dispatch(loginUser(info.username, info.password)))
    .catch(err => dispatch({ type: REGISTER_USER_ERR }));
}

export const GET_USER_REQUESTED = 'GET_USER_REQUESTED';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERR = 'GET_USER_ERR';
export const getUser = () => (dispatch) => {
  dispatch({ type: GET_USER_REQUESTED });
  return fetch(baseUrl + 'profile', {
    method: 'GET',
    credentials: 'include',
  })
    .then((response) => response.json())
    .then(json => dispatch({ type: GET_USER_SUCCESS, info: json }))
    .catch(err => dispatch({ type: GET_USER_ERR }));
}


export const UPDATE_HEADLINE_REQUESTED = 'UPDATE_HEADLINE_REQUESTED';
export const UPDATE_HEADLINE_SUCCESS = 'UPDATE_HEADLINE_SUCCESS';
export const UPDATE_HEADLINE_ERR = 'UPDATE_HEADLINE_ERR';
export const updateHeadline = (headline) => (dispatch) => {
  dispatch({ type: UPDATE_HEADLINE_REQUESTED });
  return fetch(baseUrl + 'headline', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ headline })
  })
    .then(response => response.json())
    .then(json => dispatch({ type: UPDATE_HEADLINE_SUCCESS, headline: json.headline }))
    .catch(err => dispatch({ type: UPDATE_HEADLINE_ERR }))
}

export const GET_FEED_REQUESTED = 'GET_FEED_REQUESTED';
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
export const GET_FEED_ERR = 'GET_FEED_ERR';
export const getFeed = () => (dispatch) => {
  dispatch({ type: GET_FEED_REQUESTED });
  return fetch(baseUrl + 'articles', {
    method: 'GET',
    credentials: 'include'
  })
    .then(response => response.json())
    .then(json => dispatch({ type: GET_FEED_SUCCESS, articles: json }))
    .catch(err => dispatch({ type: GET_FEED_ERR }))
}


export const ADD_ARTICLE_REQUESTED = 'ADD_ARTICLE_REQUESTED';
export const ADD_ARTICLE_SUCCESS = 'ADD_ARTICLE_SUCCESS';
export const ADD_ARTICLE_ERR = 'ADD_ARTICLE_ERR';
export const addArticle = (text, picture) => (dispatch) => {
  dispatch({ type: ADD_ARTICLE_REQUESTED });
  return fetch(baseUrl + 'article', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      text,
      picture
    })
  })
    .then(response => response.json())
    .then(json => dispatch({ type: ADD_ARTICLE_SUCCESS, articles: json }))
    .catch(err => {
      console.log(err)
      dispatch({ type: ADD_ARTICLE_ERR })
    })
}

export const EDIT_ARTICLE_REQUESTED = 'EDIT_ARTICLE_REQUESTED';
export const EDIT_ARTICLE_SUCCESS = 'EDIT_ARTICLE_SUCCESS';
export const EDIT_ARTICLE_ERR = 'EDIT_ARTICLE_ERR';
export const editArticle = (aid, text) => (dispatch) => {
  dispatch({ type: EDIT_ARTICLE_REQUESTED });
  return fetch(baseUrl + 'articles/' + aid, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      text,
    })
  })
    .then(response => response.json())
    .then(json => dispatch({ type: EDIT_ARTICLE_SUCCESS, articles: json }))
    .catch(err => dispatch({ type: EDIT_ARTICLE_ERR }));
}

export const COMMENT_ARTICLE_REQUESTED = 'COMMENT_ARTICLE_REQUESTED';
export const COMMENT_ARTICLE_SUCCESS = 'COMMENT_ARTICLE_SUCCESS';
export const COMMENT_ARTICLE_ERR = 'COMMENT_ARTICLE_ERR';
export const commentArticle = (aid, text) => (dispatch) => {
  dispatch({ type: COMMENT_ARTICLE_REQUESTED });
  return fetch(baseUrl + 'articles/' + aid, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      text,
      cid: -1
    })
  })
    .then(response => response.json())
    .then(json => dispatch({ type: COMMENT_ARTICLE_SUCCESS, articles: json }))
    .catch(err => dispatch({ type: COMMENT_ARTICLE_ERR }));
}

export const EDIT_COMMENT_REQUESTED = 'EDIT_COMMENT_REQUESTED';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_ERR = 'EDIT_COMMENT_ERR';
export const editComment = (aid, cid, text) => (dispatch) => {
  dispatch({ type: EDIT_COMMENT_REQUESTED });
  return fetch(baseUrl + 'articles/' + aid, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      text,
      cid
    })
  })
    .then(response => response.json())
    .then(json => dispatch({ type: EDIT_COMMENT_SUCCESS, articles: json }))
    .catch(err => dispatch({ type: EDIT_COMMENT_ERR }));
}

export const GET_FOLLOWING_REQUESTED = 'GET_FOLLOWING_REQUESTED';
export const GET_FOLLOWING_SUCCESS = 'GET_FOLLOWING_SUCCESS';
export const GET_FOLLOWING_ERR = 'GET_FOLLOWING_ERR';
export const getFollowing = () => (dispatch) => {
  dispatch({ type: GET_FOLLOWING_REQUESTED });
  return fetch(baseUrl + 'following', {
    method: 'GET',
    credentials: 'include'
  })
    .then(response => response.json())
    .then(json => dispatch({ type: GET_FOLLOWING_SUCCESS, res: json }))
    .catch(err => dispatch({ type: GET_FOLLOWING_ERR }))
}

export const GET_FOLLOWING_PROFILES_REQUESTED = 'GET_FOLLOWING_PROFILES_REQUESTED';
export const GET_FOLLOWING_PROFILES_SUCCESS = 'GET_FOLLOWING_PROFILES_SUCCESS';
export const GET_FOLLOWING_PROFILES_ERR = 'GET_FOLLOWING_PROFILES_ERR';
export const getFollowingProfiles = () => (dispatch) => {
  dispatch({ type: GET_FOLLOWING_PROFILES_REQUESTED });
  return fetch(baseUrl + 'followingProfiles', {
    method: 'GET',
    credentials: 'include'
  })
    .then(response => response.json())
    .then(json => dispatch({ type: GET_FOLLOWING_PROFILES_SUCCESS, res: json }))
    .catch(err => {
      console.log(err)
      dispatch({ type: GET_FOLLOWING_PROFILES_ERR })
    });

}

export const FOLLOW_USER_REQUESTED = 'FOLLOW_USER_REQUESTED';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_ERR = 'FOLLOW_USER_ERR';
export const followUser = (username) => (dispatch) => {
  dispatch({ type: FOLLOW_USER_REQUESTED });
  return fetch(baseUrl + 'following/' + username, {
    method: 'PUT',
    credentials: 'include',
  })
    .then(response => response.json())
    .then(json => dispatch({ type: FOLLOW_USER_SUCCESS, res: json }))
    .then(() => dispatch(getFeed()))
    .catch(err => dispatch({ type: FOLLOW_USER_ERR }))

}

export const UNFOLLOW_USER_REQUESTED = 'UNFOLLOW_USER_REQUESTED';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_ERR = 'UNFOLLOW_USER_ERR';
export const unfollowUser = (username) => (dispatch) => {
  dispatch({ type: UNFOLLOW_USER_REQUESTED });
  return fetch(baseUrl + 'following/' + username, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then(response => response.json())
    .then(json => dispatch({ type: UNFOLLOW_USER_SUCCESS, res: json }))
    .then(() => dispatch(getFeed()))
    .catch(err => {
      console.log(err)
      dispatch({ type: UNFOLLOW_USER_ERR })
    })
}


export const UPDATE_PROFILE_REQUESTED = 'UPDATE_PROFILE_REQUESTED';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_ERR = 'UPDATE_PROFILE_ERR';
export const updateProfile = (profile) => (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUESTED });
  fetch(baseUrl + 'profile', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ profile })
  })
    .then(response => response.json())
    .then(json => dispatch({ type: UPDATE_PROFILE_SUCCESS, res: json }))
    .catch(err => {
      console.log(err);
      dispatch({ type: UPDATE_PROFILE_ERR })
    });

  if (profile.password && profile.password === profile.confirmPassword) {
    fetch(baseUrl + 'password', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ password: profile.password })
    })
      .then(response => response.json())
      .catch(err => {
        dispatch({ type: UPDATE_PROFILE_ERR })
      })
  }
}


export const SET_KEYWORD = 'SET_KEYWORD';
export const setKeyword = (keyword) => ({
  type: SET_KEYWORD,
  keyword
});

export const UNLINK_REQEUESTED = 'UNLINK_REQUESTED';
export const UNLINK_SUCCESS = 'UNLINK_SUCCESS';
export const UNLINK_ERR = 'UNLINK_ERR';
export const unlink = (tpUid) => (dispatch) => {
  dispatch({ type: UNLINK_REQEUESTED });
  fetch(baseUrl + 'unlink', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ tpUid })
  })
    .then(response => response.json())
    .then(json => dispatch({ type: UNLINK_SUCCESS, res: json }))
    .catch(err => dispatch({ type: UNLINK_ERR }));

}

export const LINK_TO_RICEBOOK_REQEUESTED = 'LINK_TO_RICEBOOK_REQEUESTED';
export const LINK_TO_RICEBOOK_SUCCESS = 'LINK_TO_RICEBOOK_SUCCESS';
export const LINK_TO_RICEBOOK_ERR = 'LINK_TO_RICEBOOK_ERR';
export const linkToRicebook = (username, password) => (dispatch) => {
  dispatch({ type: LINK_TO_RICEBOOK_REQEUESTED });
  return fetch(baseUrl + 'link/ricebook', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(response => response.json())
    .then(json => {
      dispatch({ type: LINK_TO_RICEBOOK_SUCCESS, res: json });
      dispatch(getFeed());
      dispatch(getFollowingProfiles());
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: LINK_TO_RICEBOOK_ERR });
    });
}


export const SET_SHOW_LINK_INFO = 'SET_SHOW_LINK_INFO';
export const setShowLinkInfo = (val) => ({
  type: SET_SHOW_LINK_INFO,
  val
})