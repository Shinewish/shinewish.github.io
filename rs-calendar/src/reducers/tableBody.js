const tableBody = (state = { viewtype: 'month',
                            calendDisplay: '' }, action) => {
    switch (action.type) {
    case 'SET_VIEWTYPE': {
        const show = action.payload.viewtype === 'day' ?
                        'hide' :
                        '';
        if (action.payload.viewtype === state.viewtype) {
            return state;
        }
        return {
            viewtype: action.payload.viewtype,
            calendDisplay: show,
        };
    }
    case 'SELECT_DATE':
        if (state.viewtype === 'day') {
            return state;
        }
        return {
            viewtype: 'day',
            calendDisplay: 'hide',
        };
    default:
        return state;
    }
};

export default tableBody;
