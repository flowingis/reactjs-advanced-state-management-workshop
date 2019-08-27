import uuid from 'uuid/v1';

const add = (todos, text) => [...todos, {
    id: uuid(),
    text,
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

const toggle = (todos, id) => todos.map(t => {
    if (t.id !== id) {
        return t;
    }

    return {
        ...t,
        completed: !t.completed
    };
});

const changeText = (todos, id, text) => todos.map(t => {
    if (t.id !== id) {
        return t;
    }

    return {
        ...t,
        text
    };
});


export default {
    add,
    clearCompleted,
    toggleAll,
    toggle,
    changeText
};