import {createSelector} from 'reselect';

export const selectSections = createSelector(
    [state => state.directory],
    directory => directory.sections
);