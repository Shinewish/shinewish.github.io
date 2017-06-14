import { connect } from 'react-redux';
import Range from '../components/Range';

const mapStateToProps = (state) => ({
    value: state.range.text,
    dayView: state.tableBody.calendDisplay,
    viewtype: state.tableBody.viewtype,
});

const mapDispatchToProps = (viewtype) => (dispatch) => ({
    nextRange: (viewtype) =>
        dispatch({
            type: 'SET_NEXT_RANGE',
            payload: {
                viewtype,
            },
        }),
    prevRange: (viewtype) =>
        dispatch({
            type: 'SET_PREV_RANGE',
            payload: {
                viewtype,
            },
        }),
});

const RangeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Range);

export default RangeContainer;
