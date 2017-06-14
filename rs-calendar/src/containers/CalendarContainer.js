import { connect } from 'react-redux';
import Calendar from '../components/Calendar';

const mapStateToProps = (state) => ({
    calendDisplay: state.tableBody.calendDisplay,
    currDate: state.range.currDate,
});

const mapDispatchToProps = () => ({});

const CalendarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);

export default CalendarContainer;
