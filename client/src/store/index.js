import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import root from './reducer';
import thunk from 'redux-thunk';

const store = createStore(
    root,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
