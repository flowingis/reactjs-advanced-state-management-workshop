import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

import App from './App';
import todosReducer from './model/todosReducer';
import filterReducer from './model/filterReducer';

const logger = createLogger();

const loadState = () => {
    const data = window.localStorage.getItem('STATE');
    return data ? JSON.parse(data) : undefined;
};

const reducers = combineReducers({
    todos: todosReducer,
    filter: filterReducer
});

const saveStateMiddleware = store => next => action => {
    const result = next(action);
    window.localStorage.setItem('STATE', JSON.stringify(store.getState()));
    return result;
};

const store = createStore(
    reducers, 
    loadState(),
    compose(
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(logger, saveStateMiddleware)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);