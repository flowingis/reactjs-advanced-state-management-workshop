import React, { useState, useEffect } from 'react';
import withActions from '../withActions';

function TodoItem({ 
    todo,
    actions
}) {
    const { text, completed, id } = todo;
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(text);
    
    let input;

    const onCheckboxChange = () => {
        actions.toggle(id);
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
            actions.changeText(id, e.target.value);
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
                <button className="destroy" onClick={() => actions.delete(id)}></button>
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

export default withActions(TodoItem, 'toggle', 'changeText', 'delete');