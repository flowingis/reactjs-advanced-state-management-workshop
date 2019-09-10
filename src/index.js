import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ActionsContext from './ActionsContext';
import observableFactory from './model/observable';
import actionsFactory from './model/actions';
import { ALL } from './model/filters';

const INITIAL_STATE = {
    filter: ALL,
    todos: []
};

const loadState = () => {
    const data = window.localStorage.getItem('STATE');
    return data ? JSON.parse(data) : INITIAL_STATE;
};

const state = observableFactory(loadState());
const actions = actionsFactory(state);

state.addChangeListener(newState => {
    window.localStorage.setItem('STATE', JSON.stringify(newState));
});

ReactDOM.render(
    <ActionsContext.Provider value={actions}>
        <App state={state} />
    </ActionsContext.Provider>,
    document.getElementById('root'));