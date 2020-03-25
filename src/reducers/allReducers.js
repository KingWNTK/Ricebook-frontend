import { combineReducers } from 'redux';
import meta from './metaReducers';
import user from './userReducers';

const allReducers = combineReducers({
  meta,
  user,
});

export default allReducers;