import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import todosReducer from './model/todosReducer';
import filterReducer from './model/filterReducer';

const loadState = () => {
    const data = window.localStorage.getItem('STATE');
    return data ? JSON.parse(data) : undefined;
};


const reducers = combineReducers({
    todos: todosReducer,
    filter: filterReducer
});

const store = createStore(reducers, loadState());

store.subscribe(() => {
    window.localStorage.setItem('STATE', JSON.stringify(store.getState()));
});


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);