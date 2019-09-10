import React, { useContext } from 'react';
import pick from 'lodash.pick';
import ActionsContext from './ActionsContext';

const withActions = (Component, ...actionPaths) => {
    return (props) => {
        const actions = pick(useContext(ActionsContext), actionPaths);
        return <Component actions={actions} {...props} />;
    };
};

export default withActions;
