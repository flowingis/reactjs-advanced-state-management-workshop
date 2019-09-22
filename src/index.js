import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import eventBusFactory from './model/eventBus.js';
import modelFactory from './model/state.js';

const loadState = () => {
    const data = window.localStorage.getItem('STATE');
    return data ? JSON.parse(data) : undefined;
};

const model = modelFactory(loadState());
const eventBus = eventBusFactory(model);

eventBus.subscribe(newState => {
    window.localStorage.setItem('STATE', JSON.stringify(newState));
});


ReactDOM.render(<App eventBus={eventBus}/>, document.getElementById('root'));