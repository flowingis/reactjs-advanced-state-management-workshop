import { ALL, ACTIVE } from '../model/filters';

const notCompletedTodos = todos => todos.filter(t => !t.completed).length;
const allCompletedTodos = todos => notCompletedTodos(todos) === 0;

const visibleTodos = (todos, filter) => todos.filter(t => {
    if (filter === ALL) {
        return true;
    }

    if (filter === ACTIVE) {
        return !t.completed;
    }

    return t.completed;
});

export default {
    notCompletedTodos,
    allCompletedTodos,
    visibleTodos
};