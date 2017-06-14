import { connect } from 'react-redux';
import Day from '../components/Day';
import * as actions from '../actions';

const mapStateToProps = (state) => ({
    events: state.eventsList.events,
    currDate: state.range.currDate,
});

const DayContainer = connect(
  mapStateToProps,
  actions
)(Day);

export default DayContainer;
