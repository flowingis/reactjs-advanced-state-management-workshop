import clone from 'lodash.clonedeep';

const MAX_HISTORY_SIZE = 5;
const freeze = state => Object.freeze(clone(state));

export default (model) => {
  let listeners = [];
  let state = model();
  let history = [];

  const subscribe = listener => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  const invokeSubscribers = (state, event, oldState) => {
    const data = freeze(state);
    listeners.forEach(listener => {
      listener(
        data,
        event,
        oldState
      );
    });
  };

  const dispatch = event => {
    if(history.length === MAX_HISTORY_SIZE) {
      history.shift();
    }
    history.push(state);
    
    const newState = model(state, event);

    if (!newState) {
      throw new Error('model should always return a value');
    }

    if (newState === state) {
      return;
    }

    invokeSubscribers(newState, event, state);
    state = newState;
  };

  const goBack = () => {
    if(history.length === 0) {
      return;
    }

    const newState = history.pop();
    const backEvent = {
      type: 'HISTORY_BACK'
    };

    invokeSubscribers(newState, backEvent, state);

    state = newState;
  };

  return {
    subscribe,
    dispatch,
    goBack,
    getState: () => freeze(state)
  };
};
