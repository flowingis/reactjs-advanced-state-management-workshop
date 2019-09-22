import React from 'react';
import TodoItem from './TodoItem';

import todosQueries from '../queries/todos';
import withState from '../withState';

function Todos({
    state
}) {
    const todoElements = state
        .visibleTodos
        .map(todo => (
            <TodoItem
                key={todo.id}
                todo={todo} />
        ));

    return (
        <ul className="todo-list">
            {todoElements}
        </ul>
    );
};

const query = state => ({
    visibleTodos: todosQueries.visibleTodos(state.todos, state.filter)
});

export default withState(Todos, query);