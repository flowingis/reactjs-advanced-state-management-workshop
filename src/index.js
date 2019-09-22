import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import eventBusFactory from './model/eventBus.js';
import modelFactory from './model/state.js';

const model = modelFactory();
const eventBus = eventBusFactory(model);

ReactDOM.render(<App eventBus={eventBus}/>, document.getElementById('root'));