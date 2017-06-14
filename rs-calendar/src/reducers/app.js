import { combineReducers } from 'redux';

import range from './range';
import tableBody from './tableBody';
import eventsList from './eventsList';
import speakersList from './speakersList';

export default combineReducers({
    range,
    tableBody,
    eventsList,
    speakersList,
});
