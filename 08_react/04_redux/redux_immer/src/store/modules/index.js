import { combineReducers } from 'redux';
import counter from './counter';
import waiting from './waiting';

export default combineReducers({
  counter,
  waiting
})