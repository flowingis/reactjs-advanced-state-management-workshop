import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import stateFactory from './model/state';

const state = stateFactory();

ReactDOM.render(<App state={state}/>, document.getElementById('root'));