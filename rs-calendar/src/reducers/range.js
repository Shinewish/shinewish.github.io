import moment from 'moment';

const range = (state = { text: moment().format('MMMM YYYY'),
                         currDate: moment().format('YYYY-MM-DD'),
                         selectedDay: moment().format('YYYY-MM-DD'),
                        }, action) => {
    const period = (action.payload ? action.payload.viewtype : 'month') + 's';
    const form = period === 'months' ? 'MMMM YYYY' : 'MMMM Do, dddd';
    switch (action.type) {
    case 'SET_NEXT_RANGE':
        return {
            text: moment(state.currDate).add(1, period).format(form),
            currDate: moment(state.currDate).add(1, period).format('YYYY-MM-DD'),
            selectedDay: moment(state.currDate).add(1, period).format('YYYY-MM-DD'),
        };
    case 'SET_PREV_RANGE':
        return {
            text: moment(state.currDate).subtract(1, period).format(form),
            currDate: moment(state.currDate).subtract(1, period).format('YYYY-MM-DD'),
            selectedDay: moment(state.currDate).subtract(1, period).format('YYYY-MM-DD'),
        };
    case 'SELECT_DATE':
        return {
            text: moment(action.payload.selDate).format(form),
            currDate: moment(action.payload.selDate).format('YYYY-MM-DD'),
            selectedDay: moment(action.payload.selDate).format('YYYY-MM-DD'),
        };
    case 'SET_VIEWTYPE':
        return {
            text: moment(state.currDate).format(form),
            currDate: moment(state.currDate).startOf('month').format('YYYY-MM-DD'),
            selectedDay: moment(state.currDate).startOf('month').format('YYYY-MM-DD'),
        };
    default:
        return state;
    }
};

export default range;
