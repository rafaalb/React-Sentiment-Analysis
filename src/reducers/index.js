import { combineReducers } from 'redux';
import { quotes } from './quote_reducer';

const rootReducer = combineReducers({
  quotes
});

export default rootReducer;
