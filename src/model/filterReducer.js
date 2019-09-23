import { ACTION_TYPES } from './actionCreators';

export const ALL = 'All';
export const ACTIVE = 'Active';
export const COMPLETED = 'Completed';

export const FILTERS = [
    ALL,
    ACTIVE,
    COMPLETED
];

const changeFilter = (state, event) => {
    return event.payload;
};

const model = {
    [ACTION_TYPES.FILTER_CHANGED]: changeFilter
};

export default (prevState = ALL, event) => {
    if (!event) {
        return prevState;
    }

    const currentModel = model[event.type];

    if (!currentModel) {
        return prevState;
    }

    return currentModel(prevState, event);
};
