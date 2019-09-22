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

eventBus.subscribe((newState, event, oldState) => {
    console.log(`Event ${event.type} dispatched`);
    console.group('Event Info');
    console.log('Old State', oldState);
    console.log('Payload', event.payload);
    console.log('New State', newState);
    console.groupEnd();
});

window.goBack = eventBus.goBack;

ReactDOM.render(<App eventBus={eventBus}/>, document.getElementById('root'));