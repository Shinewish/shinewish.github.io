import { connect } from 'react-redux';
import ViewTypeList from '../components/ViewTypeList';

const mapStateToProps = (state) => ({
    viewtype: state.tableBody.viewtype,
});

const mapDispatchToProps = (dispatch) => ({
    viewMonth: () =>
        dispatch({
            type: 'SET_VIEWTYPE',
            payload: {
                viewtype: 'month',
            },
        }),
    viewDay: () =>
        dispatch({
            type: 'SET_VIEWTYPE',
            payload: {
                viewtype: 'day',
            },
        }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewTypeList);
