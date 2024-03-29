import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import songs_posted from './songs';
import followings from './followers';
import artist from './artist';
import tags from './tags';
import albums from './albums';
import posts from './posts';
import comments from './comments';
import albumLikes from './albumLikes';

const rootReducer = combineReducers({
  session, albums, albumLikes, songs_posted, artist, posts, comments, tags, followings
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
