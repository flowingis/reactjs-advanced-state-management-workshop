import clone from 'lodash.clonedeep';

const freeze = state => Object.freeze(clone(state));

export default (initialState) => {
  let listeners = [];

  const proxy = new Proxy(clone(initialState), {
    set: (target, name, value) => {
      target[name] = value;
      listeners.forEach(l => l(freeze(proxy)));
      return true;
    }
  });

  proxy.addChangeListener = cb => {
    listeners.push(cb);
    return () => {
      listeners = listeners.filter(element => element !== cb);
    };
  };

  return proxy;
};
