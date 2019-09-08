import { ALL } from './filters';
import todosModel from './todos';
import observableFactory from './observable.js';

export default function stateFactory() {
    let state = Object.freeze({
        filter: ALL,
        todos: []
    });

    const get = () => state;
    
    const changeFilter = filter => {
        state = {
            ...state,
            filter
        };
    };

    const add = (text) => {
        state = {
            ...state,
            todos: todosModel.add(state.todos, text)
        };
    };

    const clearCompleted = () => {
        state = {
            ...state,
            todos: todosModel.clearCompleted(state.todos)
        };
    };

    const toggleAll = () => {
        state = {
            ...state,
            todos: todosModel.toggleAll()
        };
    };

    const toggle = id => {
        state = {
            ...state,
            todos: todosModel.toggle(state.todos, id)
        };
    };

    const changeText = (id, text) => {
        state = {
            ...state,
            todos: todosModel.changeText(state.todos, id, text)
        };
    };

    const model = {
        changeFilter,
        toggle,
        toggleAll,
        changeText,
        add,
        clearCompleted
    };

    return observableFactory(model, get);

}