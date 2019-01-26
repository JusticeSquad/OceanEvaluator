import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import reducerProjectList from './reducers/projectReducers';


const reducers = combineReducers({
	projectListData: reducerProjectList
});

const store = createStore(
	reducers,
	applyMiddleware(thunkMiddleware)
);
store.subscribe(() => {
	console.log("store changed -> ", store.getState());
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));

serviceWorker.unregister();