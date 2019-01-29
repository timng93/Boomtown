import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import shareItemReducer from './modules/ShareItem';
// @TODO: Import your reducers

const middleware = [];

const store = createStore(
  combineReducers({
    shareItemPreview: shareItemReducer
  }),
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
