import React from 'react';
import pick from 'lodash.pick';
import { FILTERS } from '../model/filters';
import withDispatch from '../withDispatch';
import withState from '../withState';

function Filter({state, events}) {
    const current = state.filter;
    const { changeFilter } = events;
    
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

const query = state => pick(state, 'filter');
export default withDispatch(
    withState(Filter,query),
    'changeFilter'
);