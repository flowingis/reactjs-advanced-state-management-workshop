import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import stateFactory from './model/state';

const loadState = () => {
    const data = window.localStorage.getItem('STATE');
    return data ? JSON.parse(data) : undefined;
};

const state = stateFactory(loadState());

state.addChangeListener(newState => {
    window.localStorage.setItem('STATE', JSON.stringify(newState));
});

ReactDOM.render(<App state={state}/>, document.getElementById('root'));