import React from 'react';
import FILTERS from '../model/filters';
import withActions from '../withActions';

function Filter({current, actions}) {

    const { changeFilter } = actions;

    const filters = FILTERS.map(filter => (
        <li key={filter}>
            <a 
                className={current === filter ? 'selected' : ''} 
                onClick={() => changeFilter(filter)}
                href="#/">{filter}</a>
        </li>
    ));

    return (
        <ul className="filters">
            {filters}
        </ul>
    );
};

export default withActions(Filter, 'changeFilter');