import React, { useState, useEffect } from 'react';
import withDispatch from '../withDispatch';

function TodoItem({ 
    todo,
    events
}) {
    const { text, completed, id } = todo;
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(text);
    let input;

    const onCheckboxChange = () => {
        events.toggle(id);
    };

    const classes = [];

    if(completed){
        classes.push('completed');
    }

    if(editing) {
        classes.push('editing');
    }

    const cancel = () => {
        setEditing(false);
    };

    const show = () => {
        setValue(text);
        setEditing(true);
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            setEditing(false);
            events.changeText(id, e.target.value);
            return;
        }

        if(e.key === 'Escape') {
            cancel();
            return;
        }
    };

    useEffect(() => {
        if(editing){
            input.focus();
        }
    }, [editing, input]);

    return (
        <li className={classes.join(' ')}>
            <div className="view">
                <input className="toggle" type="checkbox" checked={completed} onChange={onCheckboxChange}/>
                <label onDoubleClick={show}>{text}</label>
                <button className="destroy" onClick={() => events.delete(id)}></button>
            </div>
            <input 
                ref={i => input = i}
                className="edit" 
                value={value} 
                onKeyDown={onKeyDown}
                onChange={e => setValue(e.target.value)}
                onBlur={cancel}/>
        </li>
    );
};

export default withDispatch(
    TodoItem,
    'delete',
    'changeText',
    'toggle'
);