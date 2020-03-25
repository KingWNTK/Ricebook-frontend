import * as ua from '../actions/userActions';


const filterArticle = (ariticles, keyword) => {
  if (!ariticles) return ariticles;
  return ariticles.filter(article => (article.title || '').includes(keyword) || (article.text || '').includes(keyword) || (article.author.username || '').includes(keyword));
}

let initialState = {
  auth: false,
  loginAlert: '',
  registerAlert: '',
  keyword: ''
}

let user = (state = initialState, action) => {
  switch (action.type) {
    case ua.LOGIN_USER_SUCCESS: {
      return Object.assign({}, state, { auth: true, loginAlert: null });
    }

    case ua.LOGIN_USER_ERR: {
      return Object.assign({}, state, { loginAlert: 'wrong username or password' })
    }

    case ua.LOGOUT_USER_SUCCESS: {
      return Object.assign({}, initialState);
    }

    case ua.REGISTER_USER_ERR: {
      return Object.assign({}, state, { registerAlert: 'Existing username!' })
    }

    case ua.GET_USER_SUCCESS: {
      return Object.assign({}, state, {
        auth: true,
        info: {
          ...action.info,
        },
      });
    }

    case ua.UPDATE_HEADLINE_SUCCESS: {
      let newState = Object.assign({}, state);
      newState.info.headline = action.headline;
      return newState;
    }

    case ua.GET_FEED_SUCCESS: {
      return Object.assign({}, state, {
        articles: action.articles,
        displayArticles: filterArticle(action.articles, state.keyword)
      });
    }

    case ua.ADD_ARTICLE_SUCCESS: {
      return Object.assign({}, state, {
        articles: action.articles,
        displayArticles: [...filterArticle(action.articles, state.keyword)]
      });
    }

    case ua.EDIT_ARTICLE_SUCCESS: {
      return Object.assign({}, state, {
        articles: action.articles,
        displayArticles: filterArticle(action.articles, state.keyword)
      });
    }

    case ua.COMMENT_ARTICLE_SUCCESS: {
      return Object.assign({}, state, {
        articles: action.articles,
        displayArticles: filterArticle(action.articles, state.keyword)
      });
    }

    case ua.EDIT_COMMENT_SUCCESS: {
      return Object.assign({}, state, {
        articles: action.articles,
        displayArticles: filterArticle(action.articles, state.keyword)
      });
    }

    case ua.GET_FOLLOWING_SUCCESS: {
      return Object.assign({}, state, {
        following: action.res.following
      });
    }

    case ua.GET_FOLLOWING_PROFILES_SUCCESS: {
      return Object.assign({}, state, {
        following: action.res.following.map(v => ({
          ...v,
        }))
      });
    }

    case ua.FOLLOW_USER_SUCCESS: {
      return Object.assign({}, state, {
        following: action.res.following.map(v => ({
          ...v,
        })),
        followAlert: null
      });
    }

    case ua.FOLLOW_USER_ERR: {
      return Object.assign({}, state, {followAlert: 'invalid username'})
    }

    case ua.UNFOLLOW_USER_SUCCESS: {
      return Object.assign({}, state, {
        following: action.res.following.map(v => ({
          ...v,
        }))
      });
    }

    case ua.UPDATE_PROFILE_SUCCESS: {
      let { username, ...r } = { ...action.res };
      state.info = Object.assign({}, state.info, r);
      return Object.assign({}, state);
    }

    case ua.SET_KEYWORD: {
      return Object.assign({}, state, {
        keyword: action.keyword,
        displayArticles: filterArticle(state.articles, action.keyword)
      });
    }

    case ua.UNLINK_SUCCESS: {
      return Object.assign({}, state, { info: action.res })
    }

    case ua.SET_SHOW_LINK_INFO: {
      return Object.assign({}, state, { showLinkInfo: action.val })
    }

    case ua.LINK_TO_RICEBOOK_SUCCESS: {
      return Object.assign({}, state, { info: action.res, showLinkInfo: false, linkAlert: null })
    }

    case ua.LINK_TO_RICEBOOK_ERR: {

      return Object.assign({}, state, { linkAlert: 'wrong username or passowrd' });
    }

    default: return state;
  }
}

export default user;