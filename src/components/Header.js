import React, { useState } from 'react';
import { connect } from 'react-redux';
import actionCreators from '../model/actionCreators';

function Header({ onNewTodo }) {

    const [value, setValue] = useState('');

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onNewTodo(e.target.value);
            setValue('');
        }
    };

    return (
        <header className="header">
            <h1>todos</h1>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                autoFocus
                onChange={e => setValue(e.target.value)}
                onKeyPress={onKeyPress}
                value={value} />
        </header>
    );
};

const mapDispatchToProps = dispatch => ({
    onNewTodo: text => dispatch(actionCreators.add(text))
});

export default connect(null, mapDispatchToProps)(Header);