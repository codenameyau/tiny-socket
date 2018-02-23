import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const defaultState = {
};

const thunkHelpers = {
};

const enhancers = [
	applyMiddleware(thunk.withExtraArgument(thunkHelpers))
];

const IS_DEV = window.location.hostname.indexOf('local') > -1;

if (IS_DEV) {
	const reduxDevTools = (
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
		window.__REDUX_DEVTOOLS_EXTENSION__()
	);

	enhancers.push(reduxDevTools);
}

const store = createStore(rootReducer, defaultState, compose(...enhancers));

export default store;
