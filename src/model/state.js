import { ALL } from './filters';
import todosModel from './todos';
import clone from 'lodash.clonedeep';

const freeze = s => Object.freeze(clone(s));

export default function stateFactory() {
    let state = Object.freeze({
        filter: ALL,
        todos: []
    });

 
    const changeFilter = filter => {
        state = {
            ...state,
            filter
        };
        return freeze(state);
    };

    const add = (text) => {
        state = {
            ...state,
            todos: todosModel.add(state.todos, text)
        };
        return freeze(state);
    };
    
    const clearCompleted = () => {
        state = {
            ...state,
            todos: todosModel.clearCompleted(state.todos)
        };
        return freeze(state);
    };
    
    const toggleAll = () => {
        state = {
            ...state,
            todos: todosModel.toggleAll()
        };
        return freeze(state);
    };
    
    const toggle = id => {
        state = {
            ...state,
            todos: todosModel.toggle(state.todos, id)
        };
        return freeze(state);
    };
    
    const changeText = (id, text) => {
        state = {
            ...state,
            todos: todosModel.changeText(state.todos, id, text)
        };
        return freeze(state);
    };

    const get = () => freeze(state);

    return {
        get,
        changeFilter,
        toggle,
        toggleAll,
        changeText,
        add,
        clearCompleted
    };
    
}