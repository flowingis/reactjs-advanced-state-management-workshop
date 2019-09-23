import React from 'react';
import { connect } from 'react-redux';
import { FILTERS } from '../model/filterReducer';

function Filter({current, onChangeFilter}) {

    const filters = FILTERS.map(filter => (
        <li key={filter}>
            <a 
                className={current === filter ? 'selected' : ''} 
                onClick={() => onChangeFilter(filter)}
                href="#/">{filter}</a>
        </li>
    ));

    return (
        <ul className="filters">
            {filters}
        </ul>
    );
};

export default connect(s => ({current: s.filter}))(Filter);