import React from 'react';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';

import todosQueries from '../queries/todos';

function Todos({
    visibleTodos
}) {
    const todoElements =  visibleTodos
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

const selector = state => {
    const {
        todos,
        filter
    } = state;

    const visibleTodos =  todosQueries.visibleTodos(todos, filter);

    return {
        visibleTodos
    };
};

export default connect(selector)(Todos);