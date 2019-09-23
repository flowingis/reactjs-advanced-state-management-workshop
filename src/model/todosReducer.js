import uuid from 'uuid/v1';
import { ACTION_TYPES } from './actionCreators';

const add = (todos, event) => [...todos, {
    id: uuid(),
    text: event.payload,
    completed: false
}];

const clearCompleted = todos => todos.filter(t => !t.completed);

const toggleAll = todos => {
    const notCompletedTodos = todos.filter(t => !t.completed).length;
    const allCompleted = notCompletedTodos === 0;
    return todos.map(t => ({
        ...t,
        completed: !allCompleted
    }));
};

const toggle = (todos, event) => todos.map(t => {
    if (t.id !== event.payload) {
        return t;
    }

    return {
        ...t,
        completed: !t.completed
    };
});

const changeText = (todos, event) => todos.map(t => {
    const { id, text } = event.payload;
    if (t.id !== id) {
        return t;
    }

    return {
        ...t,
        text
    };
});

const deleteTodo = (todos, event) => todos.filter(t => t.id !== event.payload);

const model = {
    [ACTION_TYPES.ITEM_ADDED]: add,
    [ACTION_TYPES.TEXT_CHANGED]: changeText,
    [ACTION_TYPES.ITEM_DELETED]: deleteTodo,
    [ACTION_TYPES.ITEM_TOGGLED]: toggle,
    [ACTION_TYPES.ALL_ITEMS_TOGGLED]: toggleAll,
    [ACTION_TYPES.COMPLETED_ITEMS_DELETED]: clearCompleted
};

export default (prevState = [], action) => {
    if (!action) {
        return prevState;
    }

    const currentModel = model[action.type];

    if (!currentModel) {
        return prevState;
    }

    return currentModel(prevState, action);
};