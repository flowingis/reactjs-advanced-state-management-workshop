import { ALL } from './filters';
import todosModel from './todos';
import clone from 'lodash.clonedeep';

const freeze = s => Object.freeze(clone(s));

export default function stateFactory() {
    let listeners = [];

    let state = Object.freeze({
        filter: ALL,
        todos: []
    });

    const get = () => freeze(state);
    
    const addChangeListener = cb => {
        listeners.push(cb);
        return () => {
            listeners = listeners
                .filter(element => element !== cb);
        };
    };

    const invokeListeners = () => {
        listeners.forEach(l => l(get()));
    };

    const changeFilter = filter => {
        state = {
            ...state,
            filter
        };
        invokeListeners();
    };

    const add = (text) => {
        state = {
            ...state,
            todos: todosModel.add(state.todos, text)
        };
        invokeListeners();
    };

    const clearCompleted = () => {
        state = {
            ...state,
            todos: todosModel.clearCompleted(state.todos)
        };
        invokeListeners();
    };

    const toggleAll = () => {
        state = {
            ...state,
            todos: todosModel.toggleAll()
        };
        invokeListeners();
    };

    const toggle = id => {
        state = {
            ...state,
            todos: todosModel.toggle(state.todos, id)
        };
        invokeListeners();
    };

    const changeText = (id, text) => {
        state = {
            ...state,
            todos: todosModel.changeText(state.todos, id, text)
        };
        invokeListeners();
    };

    return {
        addChangeListener,
        get,
        changeFilter,
        toggle,
        toggleAll,
        changeText,
        add,
        clearCompleted
    };

}